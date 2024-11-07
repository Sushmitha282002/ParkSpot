package org.happiest.capstone_microserviceauth.bdd;
import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/Features",  // Path to the feature files
        glue = {"org.happiest.capstone_microserviceauth.bdd"},               // Package where step definitions are located
        monochrome = true,                        // For readable console output
        plugin = {"pretty", "html:target/HtmlReports.html"} // Plugin for generating test reports
)
public class TestRunner {
}
