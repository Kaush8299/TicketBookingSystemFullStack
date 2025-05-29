package com.gfg.movieshark.resource;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignInResponse {

    private String message;
    private String token; // JWT or session token
}
