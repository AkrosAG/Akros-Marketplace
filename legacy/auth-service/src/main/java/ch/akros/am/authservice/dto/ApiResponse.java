package ch.akros.am.authservice.dto;

import lombok.Value;

@Value
public class ApiResponse {
	private Boolean success;
	private String message;
	private Object payload;
}
