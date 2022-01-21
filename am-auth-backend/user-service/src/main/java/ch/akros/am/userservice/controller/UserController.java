package ch.akros.am.userservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

	@GetMapping("/allusers")
	public ResponseEntity<?> getAllContent() {
		return ResponseEntity.ok("Public content goes here");
	}

}
