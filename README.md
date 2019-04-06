# Score! 

## Overview

It's election time and you have to vote for the next president of your student government. Alice of the Apple Party is alight but she is not your favorite. You also hate Bob of the Bird Party. You like Carol of the Cat Party but you are worried she might take votes away from Alice and allow the divisive candidate Bob to win. You can only vote for one. What are you to do? 

No need to worry with Score!, the voting web app that allows voters to vote without worrying about spoilers or divisive winners. No longer are you forced to vote for one candidate. You can now give each candidate a rating from 0 - 4. Voters can simply register on the app to give each candidate a rating. They can also nominate their own candidates or nominate themselves! The candidates with the highest average score rating wins!


## Data Model

The application will store Voters, Candidates, and Elections

An Example Voter:

```javascript
{
  name: "Dan",
  hash: "IStillLikeIke42!",// a password hash,
  voterid: 24, //unique voter id, randomly generated for each election
}
```

An Example Candidate

```javascript
{
  name: "Erin",
  party: "Orange Party", 
  candidateid: 1, //unique id for election the candidate is running in  
  votes: [
    { voterid: 24, score: 3},
    { voterid: 6, score: 1},
  ],
}
```

An Example Election

```javascript
{
  position: "President",
  electionid: "1" //unique id for election, 
  candidates: [Candidate],
  voters: [
    { voterid: 24},
    { voterid: 6},
  ],
  
}
```

## [Link to Commented First Draft Schema](/src/db.js) 

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories/Use Cases

1. Non-registered users can register a new account to become a registered voter.
2. Voters can log in to the site.
3. Voters can start an election.
4. Voters can nominate candidates in an election.
5. Voters can give ratings to each candidate in an election.


## Research Topics

* (3 points) Perform client side form validation using custom JavaScript or JavaScript library
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](/src/app.js) 

## Annotations / References Used

