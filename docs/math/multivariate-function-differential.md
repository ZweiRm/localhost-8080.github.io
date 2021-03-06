# 多元函数微分学
## x.1 基本概念
### x.1.1 平面点集
#### 邻域
1. 一维  
   设 $P_0(x_0)$ 是 $x$ 轴上一点，$\delta$ 是某正数，与点 $P_0$ 距离小于 $\delta$ 的点 $P(x)$ 的全体，成为点 $P_0$ 的邻域，记为 $U(x_0, \delta)$。
   
2. 二维  
   设 $P_0(x_0, y_0)$ 是平面 $xOy$ 轴上一点，$\delta$ 是某正数，与点 $P_0$ 距离小于 $\delta$ 的点 $P(x, y)$ 的全体，成为点 $P_0$ 的邻域，记为 $U(x_0, \delta)$， 即： 
   $$U(P_0, \delta)=\{(x, y) \vert \sqrt{(x-x_0)^2 + (y-y_0)^2} < \delta\}.$$  
   点 $P_0$ 的去心邻域记做 $\mathring{U}(P_0, \delta)$，即：  
   $$\mathring{U}(P_0, \delta)=\{(x, y) \vert 0 < \sqrt{(x-x_0)^2 + (y-y_0)^2} < \delta\}.$$  

### x.1.2 多元函数
#### 二元函数
1. 定义  
   设 $D$ 是 $R^2$ 的一个非空子集，称映射 $f: D \to R$ 为定义在 $D$ 上的二元函数，记为：  
   $$z=f(x, y) \quad (x, y) \in D.$$  
   其中点集 $D$ 称为该函数的**定义域**，$x$ 和 $y$ 称为 **自变量**，$z$ 称为**因变量**。函数值 $f(x,y)$ 的全体所构成集合称为该函数的**值域**，记为 $f(D)$ 。  

2. 几何意义  
   二元函数 $z=f(x, y) \quad (x, y) \in D$ 表示空间直角坐标系中的一个空间曲面。  

### x.1.3 二重极限
1. 定义  
   设二元函数 $z=f(x, y)$ 在点 $(x_0, y_0)$ 处的去心邻域 $\mathring{U}(x_0, y_0)$ 内有定义，$A$ 为常数。  
   若对于任意的 $\epsilon > 0$，都存在 $\delta > 0$ 在 $0 < \sqrt{(x-x_0)^2 + (y-y_0)^2} < \delta$ 时，使得 $\abs{f(x, y)-A} < \epsilon$，则称 $A$ 为函数 $f(x, y)$ 在点 $(x_0, y_0)$ 处的极限，记为：  
   $$\lim \limits_{(x, y) \to (x_0, y_0)}{f(x, y)} = A.$$  

   ::: tip 注
   1. 当二重极限存在，意味着自变量 $x,y$ 从所有方向趋于 $(x_0, y_0)$ 时都趋于同一个常数。  
      故，**可通过不同路径下二重极限值不相等来判定某函数趋于某点时的二重极限不存在**。  

   2. 对于分子分母都为齐次有理函数，二重极限趋于 $(0, 0)$ 点时的判定：  
      二元函数形如：  
      $$f(x, y) = \frac{P(x,y)}{Q(x,y)} = \frac{a_0 x^m + a_1 x^{m-1} y + \cdots + a_{m-1} x y^{m-1} + a_m y^m}{b_0 x^n + b_1 x^{n-1} y + \cdots + b_{n-1} x y^{n-1} + b_n y^n}$$  
      1. 当 $m>n$ 且方程 $Q(1, y)$ 和 $Q(x, 1)$ 都无实根，则 $\lim \limits_{(x, y) \to (0, 0)}{f(x, y)} = 0$；当任一方程有实根，则二重极限不存在。  

      2. 当 $m \le n$ 时，二重极限不存在。
   :::  
   
2. 性质  
   1. 连续性  
      若 $\lim \limits_{(x, y) \to (x_0, y_0)}{f(x, y)} = f(x_0, y_0)$，则称二元函数 $f(x, y)$ 在点 $(x_0, y_0)$ 处连续。  
   
   2. 有界性  
      设二元函数 $f(x, y)$ 在有界闭区域 $D$ 上连续，则 $f(x, y)$ 在 $D$ 上必定有界。

   3. 最值定理  
      设二元函数 $f(x, y)$ 在有界闭区域 $D$ 上连续，则 $f(x, y)$ 在 $D$ 上必定有最大值和最小值。  

   4. 介值定理  
      设 $M$ 和 $m$ 分别为有界闭区域 $D$ 上的连续函数 $f(x, y)$ 的最大值和最小值，则对于 $\forall C \in [m, M]$，$\exists (x_0, y_0) \in D$，使得 $f(x_0, y_0) = C.$
      
## x.2 偏导数及多元复合函数的求导
### x.2.1 偏导数
1. 定义  
   设函数 $z = f(x, y)$ 在点 $(x_0, y_0)$ 的某一邻域内有定义，当 $y$ 固定在 $y_0$，而 $x$ 在 $x_0$ 处有增量 $\Delta x$ 时，则函数有增量：  
   $$\Delta z = f(x_0 + \Delta x, y_0)-f(x_0, y_0).$$
   若极限：  
   $$\lim \limits_{\Delta x \to 0}{\frac{f(x_0 + \Delta x, y_0)-f(x_0, y_0)}{\Delta x}} \quad \text{（增量式）}$$
   或极限：  
   $$\lim \limits_{x \to x_0}{\frac{f(x, y_0) - f(x_0, y_0)}{x - x_0}} \quad \text{（差值式）}$$
   存在，则称该极限为函数 $z = f(x, y)$ 在点 $(x_0, y_0)$ 处关于 $x$ 的偏导数。记做：  
   $\left.\ \ \frac{\partial z}{\partial x}\right|_{x=x_0\atop y=y_0}$ $\left.\ \ \frac{\partial f}{\partial x}\right|_{x=x_0\atop y=y_0}$ $\left.\ {z'}_x\right|_{ {x=x}_0\atop{y=y}_0}$ ${f'}_x(x_0,y_0)$  

   同理，函数 $z = f(x, y)$ 在点 $(x_0, y_0)$ 处关于 $y$ 的偏导数定义为：  
   $$\lim \limits_{\Delta y \to 0}{\frac{f(x_0, y_0 + \Delta y)-f(x_0, y_0)}{\Delta y}} \quad \text{（增量式）}$$
   或极限：  
   $$\lim \limits_{y \to y_0}{\frac{f(x_0, y) - f(x_0, y_0)}{y - y_0}} \quad \text{（差值式）}$$  
   偏导数记做：  
   $\left.\ \ \frac{\partial z}{\partial y}\right|_{x=x_0\atop y=y_0}$ $\left.\ \ \frac{\partial f}{\partial y}\right|_{x=x_0\atop y=y_0}$ $\left.\ {z'}_y\right|_{ {x=x}_0\atop{y=y}_0}$ ${f'}_y(x_0,y_0)$  

2. 几何意义  
