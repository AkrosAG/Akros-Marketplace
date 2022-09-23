
package ch.akros.marketplace.service.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Home redirection to OpenAPI api documentation.
 */
@Controller
@Slf4j
public class HomeController {
  @RequestMapping("/")
  public String index() {
    log.debug("HomeController.index() called");

    return "redirect:/swagger-ui.html";
  }
}
