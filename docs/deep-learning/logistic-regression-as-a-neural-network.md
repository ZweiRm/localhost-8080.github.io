# Logistic Regression as a Neural Network

## Binary Classification
Logistic regression is an algorithm for binary classification.

**Scenario example**  
Take a picture as an input, and want to get a label for output to infer whether the picture is a cat. Define, the output label `y` is `1` as the picture is the case of a cat picture, and the output label is `0` as the picture is the case of not a cat picture.

::: tip To Be Specific
Say, the picture is 64 × 64 pixels. And it can be divided as 3 matrices representing the red, green and blue channel.  

Define the feature vector `x` as the every elements unroll by the color matrices. So, the dimension of the feature vector `x` is 12288. Marked as:  
$$n=n_x=12288$$  

Goal: Classifier $x->y$ can predict whether the label `y` is `1` or `0`.
:::

## Notation
+ $(x,y)$: A single training example. Where $x\in{\mathbb{R}^{n_x}}$ (`x` is a x-dimensional featutre vector), $y\in {(0, 1)}$.  

+ 