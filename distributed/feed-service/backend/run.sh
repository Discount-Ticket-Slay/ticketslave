#!/bin/bash
export $(egrep -v '^#' .env | xargs)
mvn clean install
mvn spring-boot:run