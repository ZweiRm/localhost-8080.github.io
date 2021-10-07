---
prev: ./ds-003
next: false
---

# 动态规划相关题目
动态规划适合处理一些有重叠子问题的情况。它的每一个步骤都是由上一个状态推导出的。  
其核心是通过状态转移公式（递推）来找到结果。  

**步骤**  
1. 确定 DP 数组，以及其下标含义
2. 确定状态转移公式
3. 确定 DP 数组初始化策略
4. 确定遍历顺序
5. 举例推导 DP 数组

## 组合总和 Ⅳ <Badge text="LeetCode 377" type="warning"/>
给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。  

题目数据保证答案符合 32 位整数范围。  

**示例1**  
输入：nums = [1,2,3], target = 4  
输出：7  
解释：  
所有可能的组合为：  
(1, 1, 1, 1)  
(1, 1, 2)  
(1, 2, 1)  
(1, 3)  
(2, 1, 1)  
(2, 2)  
(3, 1)  
请注意，顺序不同的序列被视作不同的组合。  

**示例2**  
输入：nums = [9], target = 3  
输出：0  

[分析]  
1. 确定 DP 数组和其下标含义  
   DP 数组存放构成加和为各 i 的排列数。如 dp[i] 表示由给定数组凑出和为 i 的排列数量。  
2. 确定状态转移公式  
   例如：给定数组[1, 2, 3, 4] 求目标和为 10 的所有组合数量。  
   对于 dp[5], 即可以凑成和为 5 的所有组合数量，可由 dp[5 - nums[j]] 得出。  
   假设当前判断到了 nums[1]，即 2. dp[5] 可由 dp[5 - 2] = dp[3] 推导出。
   理解为已经确定有 2 时，只需要得知 dp[3] 的情况即可凑出 5.    
   所以最终结果中是需要 dp[3] 的。  
   我们需要对 nums[] 每一个元素进行这样的遍历来查看具体需求，得到结果后进行累加，最终得到最后结果。  
   即当取 nums[0] 时，有 nums[0] = 1, dp[5] 需要 dp[5 - 1] = dp[4]，累加；  
   当取 nums[1] 时，有 nums[1] = 2, dp[5] 需要 dp[5 - 2] = dp[3]，累加；  
   当取 nums[2] 时，有 nums[2] = 3, dp[5] 需要 dp[5 - 3] = dp[2]，累加；  
   当取 nums[3] 时，有 nums[3] = 4, dp[5] 需要 dp[5 - 4] = dp[1]，累加；  
   即 dp[5] = dp[4] + dp[3] + dp[2] + dp[1]  
   故对指定 i, 内层对 nums 每一个元素的遍历循环有： dp[i] += dp[i - nums[j]]  
3. 确定初始值  
   dp[0] = 1;  
4. 遍历顺序  
   外层从 1 到 target 顺序遍历；内层对 nums 顺序遍历  
5. 打印 DP 数组  
   [1, 1, 2, 4, 7]  

``` java
class Solution {
    public int combinationSum4(int[] nums, int target) {
        // DP 数组
        int[] dp = new int[target + 1];

        // 初始化
        dp[0] = 1;

        // 动态规划
        for (int i = 1; i <= target; i++) {     // 对于每一个和结果
            for (int num : nums) {              // 遍历 nums 数组
                if (num <= i) {             // 只要元素不大于指定和，肯定都是结果的一部分
                    dp[i] += dp[i - num];   // 累加
                }
            }
        }

        return dp[target];
    }
}
```

## 斐波那契数 <Badge text="LeetCode 509"/>
斐波那契数，通常用 F(n) 表示，形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：  

F(0) = 0，F(1) = 1  
F(n) = F(n - 1) + F(n - 2)，其中 n > 1  
给你 n ，请计算 F(n) 。  

**示例1**  
输入：2  
输出：1  
解释：F(2) = F(1) + F(0) = 1 + 0 = 1  

**示例2**  
输入：3  
输出：2  
解释：F(3) = F(2) + F(1) = 1 + 1 = 2  

**示例3**  
输入：4  
输出：3  
解释：F(4) = F(3) + F(2) = 2 + 1 = 3  

**解法1**  
简单递归。  
``` java
class Solution {
    public int fib(int n) {
        if (n < 2) {
            return n;
        } else {
            return fib(n - 1) + fib(n - 2);
        }
    }
}
```

**解法2**  
通过动态规划解决。  
[分析]  
1. DP 数组  
   定义数组 dp[]，其中第 i 个元素 dp[i] 表示第 i 个斐波那契数  
2. 状态转移公式  
   dp[i] = dp[i - 1] + dp[i - 2]  
3. 初始化 DP 数组  
   dp[0] = 0;  
   dp[1] = 1;  
4. 遍历顺序  
   为了 dp[i] 可以取到它之前的 i-1 和 i-2, 应当从前向后遍历  
5. 打印 DP 数组  
   [0, 1, 1, 2, 3, ...] 

``` java
class Solution {
    public int fib(int n) {
        if (n < 2) {
            return n;
        }

        // 动态规划
        int[] dp = new int[n + 1];
        
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }
}
```

**解法3**  
利用三个变量来维护 i, (i - 1) 和 (i - 2).  
``` java
class Solution {
    public int fib(int n) {
        int num1 = 0;
        int num2 = 1;
        int sum = 0;

        if (n < 2) {
            return n;
        }

        for (int i = 1; i < n; i++) {
            sum = num1 + num2;
            num1 = num2;
            num2 = sum;
        }
        return sum;
    }
}
```