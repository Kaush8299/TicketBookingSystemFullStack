package com.gfg.movieshark.resource;


import com.gfg.movieshark.enums.Genre;
import com.gfg.movieshark.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@Builder
@AllArgsConstructor
@Data
public class MovieResource {

	private long id;

	private String title;

	private Genre genre;

	private String role;

	private List<ReviewResource> reviews;

}