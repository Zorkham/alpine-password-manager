Feature: Password Generator

  As a user,
  I want to generate passwords,
  So that I can copy and store them later.

  Background:
    Given I am on the password generator page

  Scenario: Generate a password with default settings
    When I change the length slider
    Then I should see a generated password

  Scenario: Copy the generated password to clipboard
    When I change the length slider
    And I click the "Copy to Clipboard" button
    Then I should see a success message "Password copied to clipboard!"

  Scenario: Generate a password with custom settings
    When I uncheck the "Include Uppercase" option
    And I uncheck the "Include Digits" option
    And I uncheck the "Include Symbols" option
    And I change the length slider
    Then I should see a generated password containing only lowercase letters

  Scenario: Generate a password with custom settings
    When I check the "Include Uppercase" option
    And I check the "Include Digits" option
    And I check the "Include Symbols" option
    And I change the length slider
    Then I should see a generated password containing uppercase letters, digits, and symbols
