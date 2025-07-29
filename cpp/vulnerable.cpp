
#include <iostream>
#include <cstring>

void risky_function() {
    char input[100];
    std::cin.getline(input, 200); // buffer overflow potential
    std::cout << "Input: " << input << std::endl;
}

void dangerous_copy(const char* user_input) {
    char buffer[64];
    strcpy(buffer, user_input); // unsafe function
    std::cout << "Copied: " << buffer << std::endl;
}

int main() {
    char *uninit_ptr;
    std::cout << uninit_ptr << std::endl; // use of uninitialized pointer

    risky_function();
    dangerous_copy("This is a very long string that will cause buffer issues.");
    return 0;
}
