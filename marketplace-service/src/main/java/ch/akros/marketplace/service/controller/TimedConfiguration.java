package ch.akros.marketplace.service.controller;

import io.micrometer.core.aop.TimedAspect;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TimedConfiguration {

    /**
     * Register the TimedAspect bean in the Spring context.
     * This will allow Micrometer to add a timer to custom methods.
     * Applying TimedAspect makes @Timed usable on any arbitrary method in an AspectJ proxied instance.
     * @param registry is an instance of an anonymous subclass of MeterRegistry abstract class, that contains methods
     *                 for building gauges for observation.
     * @return a new instance of aspect for intercepting methods annotated with @Timed.
     */
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
}