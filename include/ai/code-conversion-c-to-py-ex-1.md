Question: Convert *the function* to Python. Write good idiomatic python code using the expressive features of the language like list comprehensions where appropriate. Prefer for-loops instead of while-loops and avoid overly nested code.

Use python libraries such as `os`, `sys`, and others as necessary especially if they help translate missing C functions in the original code.
Remove \#define statements as they are not needed in Python.
Remove the function signature and replace it with the Python function signature.
Replace all C-style comments with Python-style comments and add your own comments and docstring.
Replace all C-style variable declarations with Python-style variable declarations.
Replace all C-style control structures with Python-style control structures.
Replace all C-style function calls with Python-style function calls.
Remove any constructs such as memory allocation or goto expressions.
Remove or convert code that returns error level into raised exceptions or printed errors.

You may need to find the Python equivalent for some C functions. Find these and any other translations that are needed.

Answer: First think step-by-step and describe your plan for what to build in pseudocode, written out in great detail then output the code in a **single code block**. Minimize any other prose and do not output duplicate code.