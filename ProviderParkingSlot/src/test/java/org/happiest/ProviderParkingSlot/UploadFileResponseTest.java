package org.happiest.ProviderParkingSlot;


import org.happiest.ProviderParkingSlot.response.UploadFileResponse;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ActiveProfiles("test")
class UploadFileResponseTest {

    @Test
    void testConstructorAndGetters() {
        // Arrange: Create an instance of UploadFileResponse using the constructor
        String fileName = "testfile.jpg";
        String fileDownloadUri = "http://localhost:8080/download/testfile.jpg";
        String fileType = "image/jpeg";
        long size = 12345L;

        // Act: Create an object using the constructor
        UploadFileResponse response = new UploadFileResponse(fileName, fileDownloadUri, fileType, size);

        // Assert: Verify that the constructor sets the values correctly
        assertEquals(fileName, response.getFileName());
        assertEquals(fileDownloadUri, response.getFileDownloadUri());
        assertEquals(fileType, response.getFileType());
        assertEquals(size, response.getSize());
    }

    @Test
    void testSettersAndGetters() {
        // Arrange: Create an instance of UploadFileResponse
        UploadFileResponse response = new UploadFileResponse("testfile.jpg", "http://localhost:8080/download/testfile.jpg", "image/jpeg", 12345L);

        // Act: Change the values using setters
        String newFileName = "newfile.png";
        String newFileDownloadUri = "http://localhost:8080/download/newfile.png";
        String newFileType = "image/png";
        long newSize = 67890L;

        response.setFileName(newFileName);
        response.setFileDownloadUri(newFileDownloadUri);
        response.setFileType(newFileType);
        response.setSize(newSize);

        // Assert: Verify that the setters work correctly
        assertEquals(newFileName, response.getFileName());
        assertEquals(newFileDownloadUri, response.getFileDownloadUri());
        assertEquals(newFileType, response.getFileType());
        assertEquals(newSize, response.getSize());
    }
}

