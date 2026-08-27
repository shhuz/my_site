
# 嵌入式必会的 7 个

| 命令 | 作用 | 一句懂 |
|------|------|--------|
| `project()` | 声明项目名 | 必须有，放最前面 |
| `add_executable()` | 生成可执行文件 | 就是你的 `.elf` |
| `target_sources()` | 添加 `.c` 文件 | 告诉编译器"编译这些" |
| `target_include_directories()` | 添加 `.h` 路径 | 告诉编译器"在这找头文件" |
| `target_compile_definitions()` | 添加宏定义 | `USE_HAL_DRIVER`、`DEBUG` 等 |
| `target_link_libraries()` | 链接库 | HAL 驱动、外部库 |
| `add_subdirectory()` | 引入子目录 | 另一套 CMakeLists.txt |

# 选学的 X 个

| 命令 | 用途 | 什么时候学 |
|------|------|-----------|
| `set()` | 定义变量 | 刚入门就要 |
| `add_custom_command()` | 生成 hex/bin | ✅ 你已经用上了 |
| `file(GLOB ...)` | 批量添加 `.c` | 文件多时 |
| `target_compile_options()` | 单独加编译参数 | 特殊优化时 |
| `set(CMAKE_C_STANDARD ...)` | 设 C 标准 | ✅ 你已经在用了 |
| `add_library()` | 做成静态库 | 模块化时 |
| `find_package()` | 引入第三方库 | FreeRTOS、LVGL 等 |
| `install()` | 安装规则 | 很少需要 |

# C/C++ 通用项目多 3 个常用命令，一共约 **10 个**：


## 通用项目多出来的

| 命令                        | 作用        | 例子                                  |
| ------------------------- | --------- | ----------------------------------- |
| `add_library()`           | 打包静态库/动态库 | `add_library(mylib STATIC src/a.c)` |
| `find_package()`          | 引用系统库     | `find_package(OpenSSL REQUIRED)`    |
| `set_target_properties()` | 细粒度控制     | 设置输出路径、版本号等                         |

## 嵌入式 vs 通用对比

```
嵌入式 STM32                   通用 C/C++ 桌面项目
───                          ───
main.c                        main.cpp
+ HAL 驱动                    + 自己的 lib1/ lib2/
  → add_subdirectory            → add_library + add_subdirectory
                              
交叉编译器 arm-none-eabi       本机 GCC/MSVC
  → toolchain.cmake              → 不需要

无标准库依赖                   可能需要 pthread, curl, OpenSSL
  → 不调 find_package()          → find_package()
```


实际上 CMake 有上百个命令，但 **99% 的项目用不到 20 个**，剩下的都是"需要时才查"。