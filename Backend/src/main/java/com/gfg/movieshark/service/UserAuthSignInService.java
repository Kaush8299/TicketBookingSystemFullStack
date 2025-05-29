package com.gfg.movieshark.service;

import com.gfg.movieshark.domain.User;
import com.gfg.movieshark.repository.UserRepository;
import com.gfg.movieshark.resource.SignInRequest;
import com.gfg.movieshark.resource.SignInResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserAuthSignInService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public SignInResponse signIn(SignInRequest signInRequest) {
        User user = userRepository.findByName(signInRequest.getUsername());
        if (user == null || !encoder.matches(signInRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Generate a token (e.g., JWT) or session ID (placeholder here)
        String token = "dummy-token"; // Replace with actual token generation logic

        return SignInResponse.builder()
                .message("Sign-in successful")
                .token(token)
                .build();

    }


}