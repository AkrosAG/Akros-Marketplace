package ch.akros.am.userservice.dto;

import lombok.Value;

@Value
public class ApiResponse {
	private Boolean success;
	private String message;
	private Object payload;
}
