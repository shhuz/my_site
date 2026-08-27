## 在 .c 中用子路径

**App/uart.c**：
```c
#include "App/uart.h"   // 明确指定路径
int mian

```

**Bsp/uart.c**：
```c
#include "Bsp/uart.h"   // 明确指定路径
```

CMake 中加父目录作为 include 路径：

```cmake
target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}   # 让 #include "App/uart.h" 能解析
)
```

这样**绝对不会混淆**，`main.c` 里也可以区分：

```c
#include "App/uart.h"   // 用 App 的
#include "Bsp/uart.h"   // 用 Bsp 的
```

## 方案二：各自把自己的目录加进去

```cmake
target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE
    App
    Bsp
)
```

然后在各自的 `.c` 中用相对路径写自己的头文件。但 `#include "uart.h"` 不加限定的话，由**搜索顺序**决定谁先被找到。

## 方案三：在 CMake 中按目标分别添加（更精确）

```cmake
# App 层
target_sources(${CMAKE_PROJECT_NAME} PRIVATE
    App/uart.c
)
target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE
    App
)

# Bsp 层
target_sources(${CMAKE_PROJECT_NAME} PRIVATE
    Bsp/uart.c
)
target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE
    Bsp
)
```

但这里 `App` 先加 → `#include "uart.h"` 会优先找到 `App/uart.h`

---

**实际项目中推荐方案一**，在 `.c` 中用文件夹前缀区分同名头文件，清晰且零歧义。