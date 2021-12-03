# Optimal Stopping

**Resources,**

* [Optimal Stopping Problems](http://www.him.uni-bonn.de/uploads/media/bonn2.pdf)
* [Choosing a partner](https://plus.maths.org/content/solution-optimal-stopping-problem)
* [Secretary Problem](https://www.geeksforgeeks.org/secretary-problem-optimal-stopping-problem/)
* [Google Collab Demo](https://towardsdatascience.com/optimal-stopping-algorithm-with-googles-colab-5b7f9f217e51)

Given a stochastic process in some filtered probability space and a time horizon, determine the stopping time to maximize the gain (e.g. largest value).

### Secretary Problem

Need to choose a secretary amongst a list of candidates. Once a candidate is rejected, can't be brought back, and must immediately respond to the candidate hire/pass after the interview. At what point should we choose a candidate?

1. Choose a sample size that effectively acts as our benchmark. Too small: not enough information. Too large: burned through most of the candidates. Optimal sample size is `n / e` (`n=number_candidates; e=2.71828`)
2. Choose the next number that is larger than the top candidate in n/e