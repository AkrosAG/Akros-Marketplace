
package ch.akros.marketplace.dataservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.api.SaveTopicApi;
import ch.akros.marketplace.api.model.TopicStoreRequestDTO;
import ch.akros.marketplace.dataservice.service.TopicService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class SaveTopicController implements SaveTopicApi {
  @Autowired
  private TopicService topicService;

  @Override
  public ResponseEntity<Void> saveTopicPost(TopicStoreRequestDTO topicStoreRequestDTO) {
    try {
      log.debug("SaveTopicController.saveTopicPost() called");

      topicService.storeTopic(topicStoreRequestDTO);
      return ResponseEntity.status(HttpStatus.OK).build();
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
}
