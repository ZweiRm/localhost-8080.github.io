# Logistic Regression as a Neural Network

## Notation
+ $(x,y)$  
  A single training example. Where $x\in{\mathbb{R}^{n_x}}$ ($x$ is a x-dimensional feature vector), $y\in {(0, 1)}$.

+ $m:\{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), ..., (x^{(m)}, y^{(m)})\}$ or $m=\{
m_{train}\}$  
  A training set which contains m training examples.  

+ $m=\{m_{test}\}$  
  A test example set.  

+ $X=[x^{(1)}, x^{(2)}, ..., x^{(m)}]$  
  Input training example matrix which has $n_x$ rows and $m$ columns. $X\in{\mathbb{R}^{n_x * m}}$.  
  ::: warning
  It is not a good idea to put training examples $x^{(1)T}, ..., x^{(m)T}$ as row vectors in the matrix $X$. It will cause much more efforts when computing.
  :::

+ $Y=[y^{(1)}, y^{(2)}, ..., y^{(m)}]$  
  Output matrix which has $1$ row and $m$ columns. $Y\in{\mathbb{R}^{1 * m}}$.

## Binary Classification
Logistic regression is an algorithm for binary classification (Used for the supervised learning problem which the output labels $y$ are all either 0 or 1).

**Scenario example**  
Take a picture as an input, and want to get a label for output to infer whether the picture is a cat. Define the output label $y$ is `1` as the picture is the case of a cat picture, and the output label is `0` as the picture is the case of not a cat picture.

::: tip To Be Specific
Say, the picture is 64 × 64 pixels. And it can be divided as 3 matrices representing the red, green and blue channel.  

Define the feature vector $x$ as the every elements unroll by the color matrices. So, the dimension of the feature vector $x$ is 12288. Marked as:  
$$n=n_x=12288$$  

Goal: Classifier $x->y$ can predict whether the label $y$ is `1` or `0`.
:::

## Logistic Regression
**Example**  
Given a feature vector $x$ and wanting to know the probability $\hat{y}$ of output label $y = 1$ (i.e. $\hat{y}=P(y=1|x)$).  

*Parameters*  
$w\in{\mathbb{R}^{n_x}}, b\in{\mathbb{R}}$  

*Output*  
$\hat{y}=w^Tx+b$ (Linear Regression. Will not be worked, $\hat{y}$ is not between 0 and 1.)  

$\hat{y}=\sigma(w^Tx+b)$ (Sigmoid Function, i.e. $\sigma(z)=\frac{1}{1+e^{-z}}$) 

::: tip About Sigmoid Function
*The graph of sigmoid function*  
<div align=center><img src="/img/sigmoid.jpg" alt="Sigmoid Function"></div>
<div align=center>[Sigmoid Function]</div>  

*Features*  
$\lim \limits_{z \to +\infty} \sigma(z) = 1$  
$\lim \limits_{z \to -\infty} \sigma(z) = 0$
:::

## Logistic Regression Cost Function
