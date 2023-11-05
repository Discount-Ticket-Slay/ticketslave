<<<<<<<< HEAD:distributed/purchase-service/backend/src/main/java/com/ticketslave/purchase/awslbHealth/HealthCheckController.java
package com.ticketslave.purchase.awslbHealth;
========
package com.ticketslave.queue.controller;
>>>>>>>> origin/merger:distributed/queue-service/queue-backend/src/main/java/com/ticketslave/queue/controller/HealthCheckController.java

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/queue/health")
    public String healthCheck() {
        return "Hello, World!";
    }
    
}
