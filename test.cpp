#include <iostream>
#include "./magic_enum.hpp"

enum class Color { RED = -10, BLUE = 0, GREEN = 10 };

int main() {
  Color c1 = Color::RED;
  std::cout << "io test" << std::endl;
  std::cout << magic_enum::enum_name(c1) << std::endl; // RED
  return 0;
}