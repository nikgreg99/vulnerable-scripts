
#include <stdio.h>
#include <string.h>

void insecure_function() {
    char buffer[100];
    gets(buffer); // dangerous: buffer overflow
    printf("You entered: %s\n", buffer);
}

void copy_example(char *input) {
    char dest[50];
    strcpy(dest, input); // unsafe: no bounds checking
    printf("Copied: %s\n", dest);
}

int main() {
    char name[20];
    printf("Enter name: ");
    insecure_function();
    copy_example("This is a very long input string that may overflow the destination buffer.");
    return 0;
}
