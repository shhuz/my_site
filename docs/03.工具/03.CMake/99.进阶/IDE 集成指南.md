# IDE 集成指南

## 目录

- 介绍
- 捆绑 (Bundling)
- 预设 (Presets)
- 配置 (Configuring)
- 构建 (Building)
- 测试 (Testing)
- 具有 CMake 集成的 IDE

---

## 介绍

集成开发环境 (IDE) 可能希望与 CMake 集成，以改善 CMake 用户的开发体验。本文档概述了此类集成的推荐最佳实践。

## 捆绑

许多 IDE 供应商希望随其 IDE 捆绑一份 CMake 副本。捆绑 CMake 的 IDE 应向用户提供选项，使用外部 CMake 安装而不是捆绑的版本，以防捆绑的副本过时且用户想要使用更新的版本。

虽然 IDE 供应商可能想随其应用程序捆绑不同版本的 CMake，但不推荐这种做法。CMake 具有强大的向后兼容性保证，没有理由不使用比项目要求的更新的 CMake 版本，实际上，使用最新版本。因此，建议随应用程序捆绑 CMake 的 IDE 供应商始终包含发布时可用的最新 CMake 补丁版本。

作为建议，IDE 也可以随 CMake 一起分发 Ninja 构建系统副本。Ninja 在所有支持 CMake 的平台上都具有高性能和良好的支持。捆绑 Ninja 的 IDE 应使用 Ninja 1.10 或更高版本，其中包含支持 Fortran 构建所需的特性。

## 预设

CMake 支持一种名为 CMakePresets.json 的文件格式，以及其用户特定的对应文件 CMakeUserPresets.json。此文件包含用户可能想要的各种配置预设的信息。每个预设可能有不同的编译器、构建标志等。此格式的详细信息在 cmake-presets(7) 手册中解释。

鼓励 IDE 供应商像 CMake 一样读取和评估此文件，并向用户呈现文件中列出的预设。用户应能看到（并可能编辑）为给定预设定义的 CMake 缓存变量、环境变量和命令行选项。然后 IDE 应基于这些设置构造适当的 cmake(1) 命令行参数列表，而不是直接使用 --preset= 选项。--preset= 选项仅作为命令行用户的便捷前端，IDE 不应使用它。

例如，如果名为 ninja 的预设指定 Ninja 作为生成器且 ${sourceDir}/build 作为构建目录，IDE 不应运行：

```bash
cmake -S /path/to/source --preset=ninja

而应计算 ninja 预设的设置，然后运行：

```bash
cmake -S /path/to/source -B /path/to/source/build -G Ninja
```

在预设包含大量缓存变量且将所有它们作为 -D 标志传递会导致超出平台的命令行长度限制的情况下，IDE 应构造临时缓存脚本并通过 -C 标志传递它。

虽然读取、解析和评估 CMake 预设文件内容很简单，但并非微不足道。除了文档外，IDE 供应商可能还希望参考 CMake 源代码和测试用例，以更好地理解如何实现此格式。此文件提供了 CMake 预设文件格式的机器可读 JSON 模式，IDE 供应商可能发现它对验证和提供编辑帮助很有用。

## 配置

调用 cmake(1) 运行配置步骤的 IDE 可能希望接收有关构建将产生的产物以及用于构建产物的包含目录、编译定义等的信息。此类信息可以通过使用 File API 获得。File API 的手册页包含有关 API 及其调用方式的更多信息。服务器模式已在 CMake 3.20 中移除，不应在 CMake 3.14 或更高版本上使用。

IDE 应避免创建不必要的构建树，仅当用户希望切换到不同的编译器、使用不同的编译标志等时才创建多个构建树。特别是，IDE 不应创建多个单配置构建树，这些树除不同的 CMAKE_BUILD_TYPE 外具有相同的属性，有效地创建多配置环境。相反，应使用 Ninja Multi-Config 生成器，结合 File API 获取构建配置列表来实现此目的。

IDE 不应使用带 Makefile 或 Ninja 生成器的"额外生成器"，这些生成器除了生成 Makefile 或 Ninja 文件外还生成 IDE 项目文件。相反，应使用 File API 获取构建产物列表。

## 构建

如果使用 Makefile 或 Ninja 生成器生成构建树，不建议直接调用 make 或 ninja。相反，建议 IDE 使用 --build 参数调用 cmake(1)，它将调用适当的构建工具。

如果使用 IDE 项目生成器，如 Xcode 或 Visual Studio 生成器之一，且 IDE 理解使用的项目格式，IDE 应读取项目文件并按通常方式构建它。

File API 可用于从构建树获取构建配置列表，IDE 应向用户呈现此列表以选择构建配置。

## 测试

ctest(1) 支持输出有关可用测试和测试配置的 JSON 格式。希望运行 CTest 的 IDE 应获取此信息并使用它向用户呈现测试列表。

IDE 不应调用生成的构建系统的测试目标。相反，它们应直接调用 ctest(1)。

## 具有 CMake 集成的 IDE

以下 IDE 原生支持 CMake：

- CLion
- KDevelop
- QtCreator
- Vim (通过插件)
- Visual Studio
- VSCode (通过插件)

此外，CMake 对某些 IDE 有内置支持：

- **IDE 构建工具生成器**：生成 IDE 原生构建系统，如 Visual Studio 或 Xcode。
- **额外生成器**：扩展命令行构建工具生成器以生成挂钩到命令行构建系统的 IDE 项目文件。已被 File API 取代。
```