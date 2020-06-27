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

**$w$ stand for weight, which could tell the algorithm where to focus on. $b$ stand for bias, which could make sure that the neuron will be activate meaningfully (i.e. How high the weighted sum needs to be before the neuron starts getting meaningfully active.).*  

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
Using a cost function to train the prameters $w$ and $b$ of the logistic regression model.  

### Loss (Error) Function
A function used to measure how well the algorithm is doing. (For single training example)  

+ Square Error  
  $$L(\hat{y}, y) =\frac{(\hat{y}-y)^{2}}{2}$$  
  Not usually use. The optimization problem always becomes non-convex.  Therefore, there will be more than one multiple local optima. It can not using for gradient descent to find the global optimum.

+ Cross-Entropy Loss Function  
  $$L(\hat{y}, y) =-[y \log (\hat{y})+(1-y) \log (1-\hat{y})]$$  
  The lower value of loss function is, the better prediction of algorithm is.  
  
  **[Analyse]**  
  + If $y=1$, $L(\hat{y}, y)=-\log (\hat{y})$.  
    When $L$ is small, $\log (\hat{y})$ should be large, and $\hat{y}$ should be large as well but no more than $1$.  
  + If $y=0$, $L(\hat{y}, y)=-\log (1-\hat{y})$.  
    When $L$ is small, $log (1-\hat{y})$ should be large, and $\hat{y}$ should be small but no less than $0$.

### Cost Function 
A function used to measure how well the algorithm is doing. (For the whole training set)    

$$J(w, b)=\frac{1}{m} \sum_{i=1}^{m}L(\hat{y}^{(i)}, y^{(i)})=-\frac{1}{m} \sum_{i=1}^{m}[y \log (\hat{y})+(1-y) \log (1-\hat{y})]$$  
Still, the lower value of loss function is, the better prediction of algorithm is.