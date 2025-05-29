package com.gfg.movieshark.service;


import com.gfg.movieshark.domain.User;
import com.gfg.movieshark.enums.Role;
import com.gfg.movieshark.repository.UserRepository;
import com.gfg.movieshark.resource.UserResource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public UserResource addUser(UserResource userResource) {

        if (userRepository.existsByMobile(userResource.getMobile())) {
            return userResource;
        }

	    User user = User.toEntity(userResource);

//        user = userRepository.save(user);

        String encodedPassword = encoder.encode(user.getPassword());
        log.info("Encoded password: {}", encodedPassword);
        user.setPassword(encodedPassword);
        user.setRole(Role.USER);
        userRepository.save(user);


        log.info("Added New User"+user.toString());

        return User.toResource(user);
    }


    public UserResource getUser(long id) {
        Optional<User> userEntity = userRepository.findById(id);

        if (userEntity.isEmpty()) {
            log.error("User not found for id: " + id);
            throw new EntityNotFoundException("User Not Found with ID: " + id);

        }

        return User.toResource(userEntity.get());
    }

}