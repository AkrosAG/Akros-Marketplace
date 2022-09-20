package ch.akros.marketplace.service.controller;

import ch.akros.marketplace.api.TopicsApi;
import ch.akros.marketplace.api.model.*;
import ch.akros.marketplace.service.service.TopicService;
import io.swagger.annotations.*;
import liquibase.pro.packaged.E;
import liquibase.pro.packaged.T;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.util.List;

@RestController
@Slf4j
public class TopicController implements TopicsApi {
    @Autowired
    private TopicService topicService;

    @Override
    public ResponseEntity<TopicLoadResponseDTO> topicsTopicIdGet(Long topicId) {
        try {
            log.debug("TopicController.TopicTopicIdGet() called");
            TopicLoadResponseDTO topic = topicService.loadTopic(topicId);
            return ResponseEntity.status(HttpStatus.OK).body(topic);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /*
    @Override
    public ResponseEntity<Void> _topicsPost(TopicSaveRequestDTO topicSaveRequestDTO) {
        try {
            log.debug("TopicController.topicsPost() called");
            topicService.saveTopic(topicSaveRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

     */

    /*
    @ApiOperation(value = "Save a topic", nickname = "topicsPost", notes = "Save a topic", authorizations = {
            @Authorization(value = "bearerAuth")
    }, tags={ "Topics", })


    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 200, message = "Unexpected error", response = Problem.class) })

    @RequestMapping(value = "/topics",
            produces = { "application/problem+json" },
            consumes = { "multipart/form-data" },
            method = RequestMethod.POST)
    public ResponseEntity<Void> createTopic(@ApiParam(value = "") @RequestParam(value="topics", required=false)  TopicSaveRequestDTO topics,
                                            @ApiParam(value = "") @Valid @RequestPart("files") List<MultipartFile> files) {
        //(topics, files)
        return null;
    }

     */

    //@RequestPart("topics")  TopicSaveRequestDTO topics,
    //@RequestPart("files") byte[] files
    @PostMapping(value = "/topics", consumes = { "multipart/form-data" })
    public ResponseEntity<Void> createTopic(@RequestPart("files") byte[] files) {
        //(topics, files)
        return null;
    }
    /*
    @Override
    public ResponseEntity<Void> topicsTopicIdDelete(Long topicId) {
        try {
            log.debug("TopicController.topicsDelete() called");
            topicService.deleteTopic(topicId);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

     */

    @Override
    public ResponseEntity<TopicSearchListResponseDTO> topicsSearchesPost(TopicSearchRequestDTO topicSearchRequestDTO) {
        try {
            log.debug("TopicController.topicsSearchPost() called");
            TopicSearchListResponseDTO topicSearchListResponseDTO = topicService.searchTopic(topicSearchRequestDTO);
            return ResponseEntity.status(HttpStatus.OK).body(topicSearchListResponseDTO);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<TopicSearchListResponseDTO> topicsSearchesGet() {
        try {
            log.debug("TopicController.topicsSearchesGet() called");
            TopicSearchListResponseDTO topics = topicService.findAllTopics();
            return ResponseEntity.status(HttpStatus.OK).body(topics);
        } catch(Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
