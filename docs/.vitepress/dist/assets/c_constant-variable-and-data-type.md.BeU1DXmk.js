import{_ as d,c as o,o as e,ag as c}from"./chunks/framework.DPDPlp3K.js";const u=JSON.parse('{"title":"常量、变量与数据类型","description":"","frontmatter":{"prev":{"text":"C","link":"c/index"},"next":false},"headers":[],"relativePath":"c/constant-variable-and-data-type.md","filePath":"c/constant-variable-and-data-type.md"}'),r={name:"c/constant-variable-and-data-type.md"};function a(i,t,n,l,s,p){return e(),o("div",null,t[0]||(t[0]=[c('<h1 id="常量、变量与数据类型" tabindex="-1">常量、变量与数据类型 <a class="header-anchor" href="#常量、变量与数据类型" aria-label="Permalink to &quot;常量、变量与数据类型&quot;">​</a></h1><h2 id="关键字与标识符" tabindex="-1">关键字与标识符 <a class="header-anchor" href="#关键字与标识符" aria-label="Permalink to &quot;关键字与标识符&quot;">​</a></h2><p>C 标记符包括六种类型：关键字、标识符、常量、字符串、特殊符号和运算符。</p><ul><li><p><strong>关键字 (keyword) 是程序语句的基本构成块，有固定含义且不可改变。</strong></p><p>ANSI C 规定的关键字：</p><table tabindex="0"><thead><tr><th>col 1</th><th>col 2</th><th>col 3</th><th>col 4</th></tr></thead><tbody><tr><td><code>auto</code></td><td><code>double</code></td><td><code>int</code></td><td><code>struct</code></td></tr><tr><td><code>break</code></td><td><code>else</code></td><td><code>long</code></td><td><code>switch</code></td></tr><tr><td><code>case</code></td><td><code>enum</code></td><td><code>register</code></td><td><code>typedef</code></td></tr><tr><td><code>char</code></td><td><code>extern</code></td><td><code>return</code></td><td><code>union</code></td></tr><tr><td><code>const</code></td><td><code>float</code></td><td><code>short</code></td><td><code>unsigned</code></td></tr><tr><td><code>continue</code></td><td><code>for</code></td><td><code>signed</code></td><td><code>void</code></td></tr><tr><td><code>default</code></td><td><code>goto</code></td><td><code>sizeof</code></td><td><code>volatile</code></td></tr><tr><td><code>do</code></td><td><code>if</code></td><td><code>static</code></td><td><code>while</code></td></tr></tbody></table><p style="color:#3eaf7c;"><b>* C99 增添了一些关键字。</b></p></li><li><p><strong>标识符 (identifier) 指变量名、函数和数组名。是自定义的名称。</strong></p></li></ul><div class="tip custom-block"><p class="custom-block-title">标识符的规则</p><ul><li><p>第一个字符必须是字母或下划线</p></li><li><p>只能由字母、数字或下划线组成</p></li><li><p>只有前 31 个字符是有效的（最长为 31 个字符）</p></li><li><p>不能使用关键字</p></li><li><p>不能包含空格符</p></li></ul></div><h2 id="常量" tabindex="-1">常量 <a class="header-anchor" href="#常量" aria-label="Permalink to &quot;常量&quot;">​</a></h2><p>C 语言的常量是固定值，<strong>运行中不能修改</strong>。</p><p>常量包含两大类：<strong>数字常量</strong>和<strong>字符常量</strong>。</p><p>其中数字常量包括：<strong>整型常量</strong>和<strong>实数常量</strong>；字符常量包括：<strong>单字符常量</strong>和<strong>字符串常量</strong>。</p><h3 id="整型常量" tabindex="-1">整型常量 <a class="header-anchor" href="#整型常量" aria-label="Permalink to &quot;整型常量&quot;">​</a></h3><p>指一个数字系列。包括三种类型：十进制、八进制和十六进制。</p><h4 id="十进制" tabindex="-1">十进制 <a class="header-anchor" href="#十进制" aria-label="Permalink to &quot;十进制&quot;">​</a></h4><p>由 0 到 9 的数字构成，前面可加<code>+</code>或<code>-</code>。</p><div class="warning custom-block"><p class="custom-block-title">注意</p><ul><li><p>ANSI C 支持一元加号</p></li><li><p>数字之间不允许嵌入空格、逗号或非数字字符</p></li></ul></div><h4 id="八进制" tabindex="-1">八进制 <a class="header-anchor" href="#八进制" aria-label="Permalink to &quot;八进制&quot;">​</a></h4><p>由 0 到 7 的数字组成，以 <code>0</code> 打头。</p><h4 id="十六进制" tabindex="-1">十六进制 <a class="header-anchor" href="#十六进制" aria-label="Permalink to &quot;十六进制&quot;">​</a></h4><p>由 <code>0x</code> 或 <code>0X</code> 打头，除数字 0 到 9 外，还包含字母 <code>A</code> 到 <code>F</code> 或 <code>a</code> 到 <code>f</code> 用来表示 10 到 15。</p><div class="tip custom-block"><p class="custom-block-title">关于最大取值范围</p><ul><li><p>能保存的最大整数值取决于具体计算机。32 位计算机保存的最大整数比 16 位计算机能保存的大。</p></li><li><p>当给常量加上 <code>U</code>、<code>L</code>、<code>UL</code>等修饰符时可以保存更大的整数（无符号数、长整数）。</p></li></ul></div><h3 id="实数常量" tabindex="-1">实数常量 <a class="header-anchor" href="#实数常量" aria-label="Permalink to &quot;实数常量&quot;">​</a></h3><p>也称浮点常量，是包含小数部分的数字常量。</p><p>类似整型常数，实数常数前也可以加<code>+</code>或<code>-</code>。</p><h4 id="特殊表示法" tabindex="-1">特殊表示法 <a class="header-anchor" href="#特殊表示法" aria-label="Permalink to &quot;特殊表示法&quot;">​</a></h4><p>省略掉小数点前或后的数字是允许的。如：<code>215.</code>、<code>.95</code>、<code>-.71</code>、<code>+.5</code>都是合法的。</p><div class="warning custom-block"><p class="custom-block-title">注意</p><ul><li><p>当数字以后缀<code>f</code>或<code>F</code>结尾，则强制转换为单精度。</p></li><li><p>当数字无后缀或以<code>L</code>为后缀，则明确指定为双精度。</p></li></ul></div><h3 id="单字符常量" tabindex="-1">单字符常量 <a class="header-anchor" href="#单字符常量" aria-label="Permalink to &quot;单字符常量&quot;">​</a></h3><p>用一对单引号括起来的单个字符。</p><p>字符常量具有 ASCII 整数值。</p><h3 id="字符串常量" tabindex="-1">字符串常量 <a class="header-anchor" href="#字符串常量" aria-label="Permalink to &quot;字符串常量&quot;">​</a></h3><p>用双引号括起来的一系列字符，这些字符可以是字母、数字、特殊字符或空格。</p><h3 id="反斜杠字符常量" tabindex="-1">反斜杠字符常量 <a class="header-anchor" href="#反斜杠字符常量" aria-label="Permalink to &quot;反斜杠字符常量&quot;">​</a></h3><p>也称转义字符或换码顺序。表示一些特殊含义，由<code>\\</code>和一个字符构成。</p><table tabindex="0"><thead><tr><th>常量</th><th>含义</th></tr></thead><tbody><tr><td><code>\\a</code></td><td>警告声</td></tr><tr><td><code>\\b</code></td><td>退格符</td></tr><tr><td><code>\\f</code></td><td>换页符，将当前位置移到下页开头</td></tr><tr><td><code>\\n</code></td><td>换行符</td></tr><tr><td><code>\\r</code></td><td>回车符</td></tr><tr><td><code>\\t</code></td><td>水平制表符</td></tr><tr><td><code>\\v</code></td><td>垂直制表符</td></tr><tr><td><code>\\&#39;</code></td><td>单引号</td></tr><tr><td><code>\\&#39;&#39;</code></td><td>双引号</td></tr><tr><td><code>\\?</code></td><td>问号</td></tr><tr><td><code>\\\\</code></td><td>反斜杠</td></tr><tr><td><code>\\0</code></td><td>零</td></tr></tbody></table><h2 id="变量" tabindex="-1">变量 <a class="header-anchor" href="#变量" aria-label="Permalink to &quot;变量&quot;">​</a></h2><p>是一个可用于保存数据值的数据名。</p><p>变量在不同的程序中运行时可以具有不同的值。</p><p>命名遵从<a href="#关键字与标识符">标识符</a>的规则，且区分大小写。</p><p style="color:#3eaf7c;"><b>* 有文章表明变量名不应多于八个字符，某些编译器只能识别前八个字符。（仅针对某些老式编译器）</b></p><h2 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h2><p>C 语言支持三种数据类型：<strong>基本数据类型</strong>、<strong>派生数据类型</strong>和<strong>自定义数据类型</strong>。</p><ul><li><p>基本数据类型包括：<strong>整型</strong>、<strong>浮点型</strong>和<strong>void</strong></p></li><li><p>派生类数据类型包括：<strong>数组</strong>、<strong>函数</strong>、<strong>结构体</strong>和<strong>指针</strong></p></li></ul><h3 id="整型" tabindex="-1">整型 <a class="header-anchor" href="#整型" aria-label="Permalink to &quot;整型&quot;">​</a></h3><p>整型包含两大类：<strong>整数型</strong>和<strong>字符型</strong>。</p><p>整型也包括：<strong>有符号</strong>和<strong>无符号</strong>两大类。</p><ul><li><p>有符号整数型包括：<code>int</code> <code>short int</code> <code>long int</code></p></li><li><p>无符号整数型包括：<code>unsigned int</code> <code>unsigned short int</code> <code>unsigned long int</code></p></li></ul><div class="tip custom-block"><p class="custom-block-title">关于取值范围和有无符号</p><ul><li><p>通常整数型<strong>占用一个字的长度</strong>，根据计算机的不同，它可以表述的范围不同（16 位和 32 位）。</p></li><li><p>C 语言的整数型默认是有符号的，故关键字<code>signed</code>省略。有符号整型使用其中一位来表示正负。无符号整数型指表述正值。它们取值范围不同。</p></li><li><p>整数型根据数的大小分为<code>short int</code> <code>int</code> <code>long int</code>三种来分别表述不同长度的整数。<code>short int</code>所需存储空间为<code>int</code>的一半。</p></li></ul></div><p>字符型包括：<code>char</code> <code>signed char</code> <code>unsigned char</code>。</p><p>一个单字符通常用<strong>一个字节</strong>（8位）保存。</p><p>字符类型也可以被<code>signed</code>和<code>unsigned</code>修饰，这样它们可以表示的范围会有所不同。</p><h3 id="浮点型" tabindex="-1">浮点型 <a class="header-anchor" href="#浮点型" aria-label="Permalink to &quot;浮点型&quot;">​</a></h3><p>浮点数由 32 位空间保存，其中 6 位存放小数。</p><p>当<code>float</code>提供的精度不够时，可以用<code>double</code>来表示双精度浮点数，一个<code>double</code>类型的数字占用 64 位空间，其中 14 位是小数。</p><p><code>long double</code>可以表示的范围更大，精度更高。不同编译器对其大小定义不同，有 8 字节、10 字节、12 字节和 16 字节。</p><h3 id="void型" tabindex="-1">void型 <a class="header-anchor" href="#void型" aria-label="Permalink to &quot;void型&quot;">​</a></h3><p>通常用来指定函数的类型。当函数不用返回任何值时，这个函数可以被定义为 void 类型。</p><p>同时 void 类型可以起一般类型的作用，用来表示其他各种标准类型。</p><div class="tip custom-block"><p class="custom-block-title">取值范围</p><table tabindex="0"><thead><tr><th>类型</th><th>大小（位）</th><th>表示范围</th></tr></thead><tbody><tr><td><code>char</code> <code>signed char</code></td><td>8</td><td>-128~127</td></tr><tr><td><code>unsigned char</code></td><td>8</td><td>0~255</td></tr><tr><td><code>int</code> <code>signed int</code>（16位）</td><td>16</td><td>-32,768~32,767</td></tr><tr><td><code>int</code> <code>signed int</code>（32位）</td><td>32</td><td>-2<sup>31</sup>~2<sup>31</sup>-1 （-2,147,483,648~2,147,483,647）</td></tr><tr><td><code>unsigned int</code>（16位）</td><td>16</td><td>0~65,535</td></tr><tr><td><code>unsigned int</code>（32位）</td><td>32</td><td>0~2<sup>32</sup>-1（4,294,967,395）</td></tr><tr><td><code>short int</code> <code>signed short int</code>（16位）</td><td>8</td><td>-128~127</td></tr><tr><td><code>short int</code> <code>signed short int</code>（32位）</td><td>16</td><td>-32,768~32,767</td></tr><tr><td><code>unsigned short int</code>（16位）</td><td>8</td><td>0~255</td></tr><tr><td><code>unsigned short int</code>（32位）</td><td>16</td><td>0~65,535</td></tr><tr><td><code>long int</code> <code>signed long int</code></td><td>32</td><td>-2<sup>31</sup>~2<sup>31</sup>-1</td></tr><tr><td><code>unsigned long int</code></td><td>32</td><td>0~2<sup>32</sup>-1</td></tr><tr><td><code>float</code></td><td>32</td><td>3.4E-38~3.4E+38</td></tr><tr><td><code>double</code></td><td>64</td><td>1.7E-308~1.7E+308</td></tr><tr><td><code>long double</code>（用 10 位存储）</td><td>80</td><td>3.4E-4932~1.1E+4932</td></tr><tr><td><code>long double</code>（用 16 位存储）</td><td>128</td><td>3.4E-4932~1.1E+4932</td></tr></tbody></table></div>',57)]))}const g=d(r,[["render",a]]);export{u as __pageData,g as default};
