package com.gfg.movieshark.controller;

import com.gfg.movieshark.resource.SignInRequest;
import com.gfg.movieshark.resource.SignInResponse;
import com.gfg.movieshark.service.UserAuthSignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class UserAuthController {

    @Autowired
    private UserAuthSignInService userAuthSignInService;


    @PostMapping("/signin")
    public ResponseEntity<SignInResponse> signIn(@Valid @RequestBody SignInRequest signInRequest) {
        SignInResponse response = userAuthSignInService.signIn(signInRequest);
        return ResponseEntity.ok(response);
    }
}