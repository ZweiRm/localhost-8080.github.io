---
prev: ./
next: false
---

# Introduction
## History
+ Ants, cavemen, and Early Recommender Systems
	+ The emergence of critics
+ Information Retrieval and Filtering
+ Manual Collaborative Filtering
+ Automated Collaborative Filtering
+ The Commercial Era
 
## Information Retrieval and Filtering
### Information Retrieval
+ Static content base  
    Invest time in indexing content
+ Dynamic information need  
    Queries presented in "real time"
+ Common approach: TFIDF (Term Frequency-Inverse Document Frequency)  
    Rank documents by term overlap  
    Rank terms by frequency
        
+ Problem: The stream of information changes rapidly, but people only need the information related to their needs.  
  (Information retrieval were reversed)
	 
### Information Filtering
+ Reverse assumptions from IR  
    Static information need  
    Dynamic content base  
+ Invest effort in modeling user need  
    Hand-created "profile"  
    Machine learned profile  
    Feedback/updates  
+ Pass new content through filters  
 
## Manual Collaborative Filtering (CF)
+ Premise (前提)  
    Information need more complex than keywords or topics: quality and taste
+ Small Community: Manual  
    Tapestry: database of content and comments  
    Active CF: easy mechanisms for forwarding content to relevant readers
 
## Recommendation Approaches
+ Non-Personalized and Stereotyped  
    Popularity, Group Preference  
+ Product Association  
    People who like/bought X, also like Y  
+ Content-Based  
    Learn what I like (attributes)  
+ Collaborative  
    Learn what I like: use others' experience to recommend (multiple ways)  

## Preferences and Ratings
+ Explicit (the preference got from asking users to give comments)  
    Rating  
    Review  
    Vote  
+ Implicit (the preference got by users' actions)  
    Click  
    Purchase  
    Follow  
 
## Predictions and Recommendations
+ Prediction
    + Estimates of how much user will like an item  
      Often scaled to match some rating scale  
      Often tied to search or browsing for specific products  
    + Pro: helps quantify item
    + Con: provides something falsifiable (证伪的）
+ Recommendations
    + Suggestions for items user might like (or might fit what they are doing)  
        Often presented in the form of "top-n" list  
        Also sometimes just placed in front of the user  
    + Pro: provides good choices as a default
    + Con: if perceived as top-n, can result in failure to explore (when the top few seem poor)  
+ Explicitly(直白地) and Organically(自然逐步地)
    + Explicit recommend: recommend items directly
    + Organic recommend: recommend items gradually
    + Historical: Just for you (show the recommendation directly)
    + Today:  
        Balance between explicit prediction(falsifiable) and coarser granularity(粗粒度)  
        Balance between top-n and softer presentation(might be interesting)  
 
## Taxonomy (分类学) of Recommenders
+ Dimensions of Analysis of Recommender System
    + Domain
        + Content to Commerce and Beyond  
            News, information, "text"  
            Products, vendors, bundles  
            Matchmaking (other people)  
            Sequences (e.g., music playlists)  
        + One particularly interesting property  
            New items (e.g., movies, books, ...)  
            Re-recommend old ones (e.g., groceries, music)  
    + Purpose  
        + The recommendations themselves  
            Sales  
            Information  
        + Education of user/customer
        + Build a community of users/customers around products or content
    + Recommendation Context  
        + The user action when getting recommendation  
        + The constrain approach of context to the recommender  
            Groups  
            Automatic consumption (vs. suggestion)  
            Level of attention  
            Level of interruption   
    + Whose Opinions (Data)  
        "Experts"  
        Ordinary "phoaks"  
        Normal people  
    + Personalization Level
        
    + Privacy and Trustworthiness
    + Interfaces
    + Recommendation Algorithms
