(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{488:function(e,n,t){"use strict";t.r(n);var r=t(20),i=Object(r.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"introduction"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),t("h2",{attrs:{id:"history"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#history"}},[e._v("#")]),e._v(" History")]),e._v(" "),t("ul",[t("li",[e._v("Ants, cavemen, and Early Recommender Systems\n"),t("ul",[t("li",[e._v("The emergence of critics")])])]),e._v(" "),t("li",[e._v("Information Retrieval and Filtering")]),e._v(" "),t("li",[e._v("Manual Collaborative Filtering")]),e._v(" "),t("li",[e._v("Automated Collaborative Filtering")]),e._v(" "),t("li",[e._v("The Commercial Era")])]),e._v(" "),t("h2",{attrs:{id:"information-retrieval-and-filtering"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#information-retrieval-and-filtering"}},[e._v("#")]),e._v(" Information Retrieval and Filtering")]),e._v(" "),t("h3",{attrs:{id:"information-retrieval"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#information-retrieval"}},[e._v("#")]),e._v(" Information Retrieval")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Static content base"),t("br"),e._v("\nInvest time in indexing content")])]),e._v(" "),t("li",[t("p",[e._v("Dynamic information need"),t("br"),e._v('\nQueries presented in "real time"')])]),e._v(" "),t("li",[t("p",[e._v("Common approach: TFIDF (Term Frequency-Inverse Document Frequency)"),t("br"),e._v("\nRank documents by term overlap"),t("br"),e._v("\nRank terms by frequency")])]),e._v(" "),t("li",[t("p",[e._v("Problem: The stream of information changes rapidly, but people only need the information related to their needs."),t("br"),e._v("\n(Information retrieval were reversed)")])])]),e._v(" "),t("h3",{attrs:{id:"information-filtering"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#information-filtering"}},[e._v("#")]),e._v(" Information Filtering")]),e._v(" "),t("ul",[t("li",[e._v("Reverse assumptions from IR"),t("br"),e._v("\nStatic information need"),t("br"),e._v("\nDynamic content base")]),e._v(" "),t("li",[e._v("Invest effort in modeling user need"),t("br"),e._v('\nHand-created "profile"'),t("br"),e._v("\nMachine learned profile"),t("br"),e._v("\nFeedback/updates")]),e._v(" "),t("li",[e._v("Pass new content through filters")])]),e._v(" "),t("h2",{attrs:{id:"manual-collaborative-filtering-cf"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#manual-collaborative-filtering-cf"}},[e._v("#")]),e._v(" Manual Collaborative Filtering (CF)")]),e._v(" "),t("ul",[t("li",[e._v("Premise (前提)"),t("br"),e._v("\nInformation need more complex than keywords or topics: quality and taste")]),e._v(" "),t("li",[e._v("Small Community: Manual"),t("br"),e._v("\nTapestry: database of content and comments"),t("br"),e._v("\nActive CF: easy mechanisms for forwarding content to relevant readers")])]),e._v(" "),t("h2",{attrs:{id:"recommendation-approaches"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#recommendation-approaches"}},[e._v("#")]),e._v(" Recommendation Approaches")]),e._v(" "),t("ul",[t("li",[e._v("Non-Personalized and Stereotyped"),t("br"),e._v("\nPopularity, Group Preference")]),e._v(" "),t("li",[e._v("Product Association"),t("br"),e._v("\nPeople who like/bought X, also like Y")]),e._v(" "),t("li",[e._v("Content-Based"),t("br"),e._v("\nLearn what I like (attributes)")]),e._v(" "),t("li",[e._v("Collaborative"),t("br"),e._v("\nLearn what I like: use others' experience to recommend (multiple ways)")])]),e._v(" "),t("h2",{attrs:{id:"preferences-and-ratings"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#preferences-and-ratings"}},[e._v("#")]),e._v(" Preferences and Ratings")]),e._v(" "),t("ul",[t("li",[e._v("Explicit (the preference got from asking users to give comments)"),t("br"),e._v("\nRating"),t("br"),e._v("\nReview"),t("br"),e._v("\nVote")]),e._v(" "),t("li",[e._v("Implicit (the preference got by users' actions)"),t("br"),e._v("\nClick"),t("br"),e._v("\nPurchase"),t("br"),e._v("\nFollow")])]),e._v(" "),t("h2",{attrs:{id:"predictions-and-recommendations"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#predictions-and-recommendations"}},[e._v("#")]),e._v(" Predictions and Recommendations")]),e._v(" "),t("ul",[t("li",[e._v("Prediction\n"),t("ul",[t("li",[e._v("Estimates of how much user will like an item"),t("br"),e._v("\nOften scaled to match some rating scale"),t("br"),e._v("\nOften tied to search or browsing for specific products")]),e._v(" "),t("li",[e._v("Pro: helps quantify item")]),e._v(" "),t("li",[e._v("Con: provides something falsifiable (证伪的）")])])]),e._v(" "),t("li",[e._v("Recommendations\n"),t("ul",[t("li",[e._v("Suggestions for items user might like (or might fit what they are doing)"),t("br"),e._v('\nOften presented in the form of "top-n" list'),t("br"),e._v("\nAlso sometimes just placed in front of the user")]),e._v(" "),t("li",[e._v("Pro: provides good choices as a default")]),e._v(" "),t("li",[e._v("Con: if perceived as top-n, can result in failure to explore (when the top few seem poor)")])])]),e._v(" "),t("li",[e._v("Explicitly(直白地) and Organically(自然逐步地)\n"),t("ul",[t("li",[e._v("Explicit recommend: recommend items directly")]),e._v(" "),t("li",[e._v("Organic recommend: recommend items gradually")]),e._v(" "),t("li",[e._v("Historical: Just for you (show the recommendation directly)")]),e._v(" "),t("li",[e._v("Today:"),t("br"),e._v("\nBalance between explicit prediction(falsifiable) and coarser granularity(粗粒度)"),t("br"),e._v("\nBalance between top-n and softer presentation(might be interesting)")])])])]),e._v(" "),t("h2",{attrs:{id:"taxonomy-分类学-of-recommenders"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#taxonomy-分类学-of-recommenders"}},[e._v("#")]),e._v(" Taxonomy (分类学) of Recommenders")]),e._v(" "),t("ul",[t("li",[e._v("Dimensions of Analysis of Recommender System\n"),t("ul",[t("li",[t("p",[e._v("Domain")]),e._v(" "),t("ul",[t("li",[e._v("Content to Commerce and Beyond"),t("br"),e._v('\nNews, information, "text"'),t("br"),e._v("\nProducts, vendors, bundles"),t("br"),e._v("\nMatchmaking (other people)"),t("br"),e._v("\nSequences (e.g., music playlists)")]),e._v(" "),t("li",[e._v("One particularly interesting property"),t("br"),e._v("\nNew items (e.g., movies, books, ...)"),t("br"),e._v("\nRe-recommend old ones (e.g., groceries, music)")])])]),e._v(" "),t("li",[t("p",[e._v("Purpose")]),e._v(" "),t("ul",[t("li",[e._v("The recommendations themselves"),t("br"),e._v("\nSales"),t("br"),e._v("\nInformation")]),e._v(" "),t("li",[e._v("Education of user/customer")]),e._v(" "),t("li",[e._v("Build a community of users/customers around products or content")])])]),e._v(" "),t("li",[t("p",[e._v("Recommendation Context")]),e._v(" "),t("ul",[t("li",[e._v("The user action when getting recommendation")]),e._v(" "),t("li",[e._v("The constrain approach of context to the recommender"),t("br"),e._v("\nGroups"),t("br"),e._v("\nAutomatic consumption (vs. suggestion)"),t("br"),e._v("\nLevel of attention"),t("br"),e._v("\nLevel of interruption")])])]),e._v(" "),t("li",[t("p",[e._v("Whose Opinions (Data)"),t("br"),e._v('\n"Experts"'),t("br"),e._v('\nOrdinary "phoaks"'),t("br"),e._v("\nNormal people")])]),e._v(" "),t("li",[t("p",[e._v("Personalization Level")])]),e._v(" "),t("li",[t("p",[e._v("Privacy and Trustworthiness")])]),e._v(" "),t("li",[t("p",[e._v("Interfaces")])]),e._v(" "),t("li",[t("p",[e._v("Recommendation Algorithms")])])])])])])}),[],!1,null,null,null);n.default=i.exports}}]);