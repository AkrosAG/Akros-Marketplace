package ch.akros.marketplace.controller;

import ch.akros.marketplace.api.model.TopicLoadResponseDTO;
import ch.akros.marketplace.service.controller.TopicController;
import ch.akros.marketplace.service.service.TopicService;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TopicControllerTest {
    @Mock
    private MeterRegistry registry;

    @Mock
    private TopicService topicService;

    @Mock
    TopicLoadResponseDTO topicLoadResponseDTO;

    private TopicController topicController;

    @BeforeEach
    public void beforeEach() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void counterMetricIncrementsTest() {
        // given
        Counter counterForLoadTopic = mock(Counter.class);
        when(registry.counter("counter_for_load_topic")).thenReturn(counterForLoadTopic);
        when(topicService.loadTopic(1L)).thenReturn(topicLoadResponseDTO);

        topicController = new TopicController(registry, topicService);
        // when
        ResponseEntity<TopicLoadResponseDTO> response = topicController.topicsTopicIdGet(1L);

        // then
        assertTrue(response.hasBody());
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        assertEquals(response.getBody(), topicLoadResponseDTO);
        verify(counterForLoadTopic).increment();
        verify(registry).counter(eq("counter_for_load_topic"));
        verify(topicService).loadTopic(eq(1L));
        verifyNoMoreInteractions(counterForLoadTopic, registry, topicService);
    }

    @Test
    public void counterMetricNotIncrementsTest() {
        // given
        Counter counterForLoadTopic = mock(Counter.class);
        when(registry.counter("counter_for_load_topic")).thenReturn(counterForLoadTopic);
        when(topicService.loadTopic(2L)).thenThrow(new NullPointerException("Error occurred"));

        topicController = new TopicController(registry, topicService);
        // when
        ResponseEntity<TopicLoadResponseDTO> response = topicController.topicsTopicIdGet(2L);

        // then
        assertFalse(response.hasBody());
        assertEquals(response.getStatusCode(), HttpStatus.INTERNAL_SERVER_ERROR);
        verifyNoInteractions(counterForLoadTopic);
    }

}
