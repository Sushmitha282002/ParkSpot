package org.happiest.ProviderParkingSlot;

import org.happiest.ProviderParkingSlot.exception.FileStorageException;

import org.happiest.ProviderParkingSlot.exception.MyFileNotFoundException;

import org.happiest.ProviderParkingSlot.service.FileStorageService;

import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;

import org.mockito.Mock;

import org.mockito.MockitoAnnotations;

import org.springframework.core.io.Resource;

import org.springframework.core.io.UrlResource;

import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;

import java.net.MalformedURLException;

import java.nio.file.FileAlreadyExistsException;

import java.nio.file.Files;

import java.nio.file.Path;

import java.nio.file.Paths;

import static org.happiest.ProviderParkingSlot.constants.ProviderParkingAreaConstants.*;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.Mockito.*;

class FileStorageServiceTest {

    @InjectMocks

    private FileStorageService fileStorageService;

    private Path fileStorageLocation;

    @BeforeEach

    void setUp() {

        MockitoAnnotations.openMocks(this);

        fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

        fileStorageService = new FileStorageService();

    }

    @Test

    void storeFile_shouldStoreValidFile() throws IOException {

        MockMultipartFile mockMultipartFile = new MockMultipartFile(

                "file",

                "testFile.txt",

                "text/plain",

                "Sample content".getBytes()

        );

        String fileName = fileStorageService.storeFile(mockMultipartFile);

        assertEquals("testFile.txt", fileName);

        // Verify the file is stored correctly

        Path targetLocation = fileStorageLocation.resolve("testFile.txt");

        assertTrue(Files.exists(targetLocation));

        // Cleanup the file after the test

        Files.delete(targetLocation);

    }

    @Test

    void storeFile_shouldThrowExceptionForInvalidFileName() {

        MockMultipartFile mockMultipartFile = new MockMultipartFile(

                "file",

                "../testFile.txt",

                "text/plain",

                "Sample content".getBytes()

        );

        FileStorageException exception = assertThrows(

                FileStorageException.class,

                () -> fileStorageService.storeFile(mockMultipartFile)

        );

        assertEquals(INVALID_PATH_SEQUENCE + "../testFile.txt", exception.getMessage());

    }


    @Test

    void loadFileAsResource_shouldThrowExceptionIfFileNotFound() {

        MyFileNotFoundException exception = assertThrows(

                MyFileNotFoundException.class,

                () -> fileStorageService.loadFileAsResource("nonExistentFile.txt")

        );

        assertEquals(FILE_NOT_FOUND + "nonExistentFile.txt", exception.getMessage());

    }


}

