# Blockchain

From Wikipedia, the free encyclopedia

Jump to: [navigation](#mw-head), [search](#p-search)

Blockchain formation. The main chain (black) consists of the longest series of blocks from the genesis block (green) to the current block. Orphan blocks (purple) exist outside of the main chain.

[Bitcoin network](/wiki/Bitcoin_network "Bitcoin network") data

A **blockchain**,<sup>[[1]](#cite-note-te20151031-1)</sup><sup>[[2]](#cite-note-fortune20160515-2)</sup><sup>[[3]](#cite-note-nyt20160521-3)</sup> originally **block chain**,<sup>[[4]](#cite-note-primer-4)</sup><sup>[[5]](#cite-note-obmh-5)</sup> is a continuously growing list of [records](/wiki/Record_(computer_science) "Record (computer science)"), called _blocks_, which are linked and secured using [cryptography](/wiki/Cryptography "Cryptography").<sup>[[1]](#cite-note-te20151031-1)</sup><sup>[[6]](#cite-note-cryptocurrencytech-6)</sup> Each block typically contains a [cryptographic hash](/wiki/Cryptographic_hash_function "Cryptographic hash function") of the previous block,<sup>[[6]](#cite-note-cryptocurrencytech-6)</sup> a [timestamp](/wiki/Trusted_timestamping "Trusted timestamping") and transaction data.<sup>[[7]](#cite-note-ipblockchain-7)</sup> By design, a blockchain is inherently resistant to modification of the data. It is "an open, [distributed ledger](/wiki/Distributed_ledger "Distributed ledger") that can record transactions between two parties efficiently and in a verifiable and permanent way".<sup>[[8]](#cite-note-hbr201701-8)</sup> For use as a distributed ledger, a blockchain is typically managed by a [peer-to-peer](/wiki/Peer-to-peer "Peer-to-peer") network collectively adhering to a protocol for validating new blocks. Once recorded, the data in any given block cannot be altered retroactively without the alteration of all subsequent blocks, which requires collusion of the network majority.

Blockchains are [secure by design](/wiki/Secure_by_design "Secure by design") and are an example of a distributed computing system with high [Byzantine fault tolerance](/wiki/Byzantine_fault_tolerance "Byzantine fault tolerance"). [Decentralized](/wiki/Decentralized "Decentralized") consensus has therefore been achieved with a blockchain.<sup>[[9]](#cite-note-decapp-9)</sup> This makes blockchains potentially suitable for the recording of events, medical records,<sup>[[10]](#cite-note-10)</sup><sup>[[11]](#cite-note-11)</sup> and other [records management](/wiki/Records_management "Records management") activities, such as [identity management](/wiki/Identity_management "Identity management"),<sup>[[12]](#cite-note-12)</sup><sup>[[13]](#cite-note-13)</sup><sup>[[14]](#cite-note-14)</sup> [transaction processing](/wiki/Transaction_processing "Transaction processing"), documenting [provenance](/wiki/Provenance "Provenance"), [food traceability](/wiki/Traceability#Food_processing "Traceability")<sup>[[15]](#cite-note-15)</sup> or voting.<sup>[[16]](#cite-note-16)</sup>

Blockchain was invented by [Satoshi Nakamoto](/wiki/Satoshi_Nakamoto "Satoshi Nakamoto") in 2008 for use in the [cryptocurrency bitcoin](/wiki/Bitcoin "Bitcoin"), as its public transaction [ledger](/wiki/Ledger "Ledger").<sup>[[1]](#cite-note-te20151031-1)</sup>

## Contents

- [1 History](#history)
- [2 Structure](#structure)
  * [2.1 Blocks](#blocks)
    + [2.1.1 Block time](#block-time)
    + [2.1.2 Hard forks](#hard-forks)
  * [2.2 Decentralization](#decentralization)
  * [2.3 Openness](#openness)
    + [2.3.1 Permissionless](#permissionless)
    + [2.3.2 Permissioned (private) blockchain](#permissioned-private-blockchain)
    + [2.3.3 Disadvantages](#disadvantages)
- [3 Uses](#uses)
  * [3.1 General potentials](#general-potentials)
  * [3.2 Land registration](#land-registration)
  * [3.3 The Big Four](#the-big-four)
  * [3.4 Smart contracts](#smart-contracts)
  * [3.5 Nonprofit organizations](#nonprofit-organizations)
  * [3.6 Decentralized networks](#decentralized-networks)
  * [3.7 Governments and national currencies](#governments-and-national-currencies)
  * [3.8 Banks](#banks)
  * [3.9 Other financial companies](#other-financial-companies)
  * [3.10 Other uses](#other-uses)
- [4 Academic research](#academic-research)
  * [4.1 Journals](#journals)
- [5 Predictions](#predictions)
- [6 See also](#see-also)
- [7 References](#references)
- [8 Further reading](#further-reading)
- [9 External links](#external-links)

## History [[edit](/w/index.php?title=Blockchain&action=edit&section=1 "Edit section: History")]

Bitcoin transactions (January 2009 – September 2017)

The first work on a cryptographically secured chain of blocks was described in 1991 by Stuart Haber and W. Scott Stornetta.<sup>[[17]](#cite-note-17)</sup> In 1992, Bayer, Haber and Stornetta incorporated [Merkle trees](/wiki/Merkle_tree "Merkle tree") to the design, which improved its efficiency by allowing several documents to be collected into one block.<sup>[[6]](#cite-note-cryptocurrencytech-6)</sup><sup>[[18]](#cite-note-18)</sup> In 2002, David Mazières and Dennis Shasha proposed a network file system with decentralized trust: writers to the file system trust one another but not the network in between; they achieve file system integrity by writing signed commits to a shared, append-only signature chain that captures the root of the file system (which in turn is a Merkle Tree).<sup>[[19]](#cite-note-19)</sup> This system can be viewed as a proto-blockchain in which all authorized clients can always write, whereas, in modern blockchains, a client who solves a cryptographic puzzle can write one block.<sup>[_ [citation needed](/wiki/Wikipedia:Citation_needed "Wikipedia:Citation needed")_]</sup> In 2005, [Nick Szabo](/wiki/Nick_Szabo "Nick Szabo") proposed a blockchain-like system for decentralized property titles and his [bit gold](/wiki/Bit_gold "Bit gold") payment system that utilised chained proof-of-work and timestamping. However, Szabo's method of double-spending protection was vulnerable to [Sybil attacks](/wiki/Sybil_attacks "Sybil attacks").<sup>[[20]](#cite-note-20)</sup><sup>[_ [not in citation given](/wiki/Wikipedia:Verifiability "Wikipedia:Verifiability")_]</sup>

The first blockchain was conceptualised by a person (or group of people) known as [Satoshi Nakamoto](/wiki/Satoshi_Nakamoto "Satoshi Nakamoto") in 2008. It was implemented the following year by Nakamoto as a core component of the [cryptocurrency bitcoin](/wiki/Bitcoin "Bitcoin"), where it serves as the public [ledger](/wiki/Ledger "Ledger") for all transactions on the network.<sup>[[1]](#cite-note-te20151031-1)</sup> Through the use of a blockchain, bitcoin became the first digital currency to solve the [double spending](/wiki/Double_spending "Double spending") problem without requiring a trusted authority and has been the inspiration for many additional applications.<sup>[[4]](#cite-note-primer-4)</sup><sup>[[1]](#cite-note-te20151031-1)</sup><sup>[[3]](#cite-note-nyt20160521-3)</sup>

In August 2014, the bitcoin blockchain file size, containing records of all transactions that have occurred on the network, reached 20GB ([gigabytes](/wiki/Gigabyte "Gigabyte")).<sup>[[21]](#cite-note-hadi-21)</sup> In January 2015, the size had grown to almost 30GB, and from January 2016 to January 2017, the bitcoin blockchain grew from 50GB to 100GB in size.<sup>[[22]](#cite-note-22)</sup> The words _block_ and _chain_ were used separately in Satoshi Nakamoto's original paper, but were eventually popularized as a single word, _blockchain,_ by 2016.

The term _blockchain 2.0_ refers to new applications of the distributed blockchain database, first emerging in 2014.<sup>[[23]](#cite-note-bc20-23)</sup> _ [The Economist](/wiki/The_Economist "The Economist")_ described one implementation of this second-generation programmable blockchain as coming with "a programming language that allows users to write more sophisticated smart contracts, thus creating invoices that pay themselves when a shipment arrives or share certificates which automatically send their owners dividends if profits reach a certain level".<sup>[[1]](#cite-note-te20151031-1)</sup> Blockchain 2.0 technologies go beyond transactions and enable "exchange of value without powerful intermediaries acting as arbiters of money and information". They are expected to enable excluded people to enter the global economy, protect the privacy of participants, allow people to "monetize their own information", and provide the capability to ensure creators are compensated for their [intellectual property](/wiki/Intellectual_property "Intellectual property"). Second-generation blockchain technology makes it possible to store an individual's "persistent digital ID and persona" and are providing an avenue to help solve the problem of [social inequality](/wiki/Social_inequality "Social inequality") by "potentially changing the way wealth is distributed".<sup>[[24]](#cite-note-tapscott201605-24)</sup><sup>:14–15</sup> As of 2016<sup>[[update]](//en.wikipedia.org/w/index.php?title=Blockchain&action=edit)</sup>, blockchain 2.0 implementations continue to require an off-chain [oracle](/wiki/Oracle_(computer_science) "Oracle (computer science)") to access any "external data or events based on time or market conditions [that need] to interact with the blockchain".<sup>[[25]](#cite-note-bletchleywp201609-25)</sup>

In 2016, the central securities depository of the Russian Federation ([NSD](/wiki/National_Settlement_Depository_(Russia) "National Settlement Depository (Russia)")) announced a pilot project, based on the [Nxt](/wiki/Nxt "Nxt") blockchain 2.0 platform, that would explore the use of blockchain-based automated voting systems.<sup>[[26]](#cite-note-26)</sup> IBM opened a blockchain innovation research center in Singapore in July 2016.<sup>[[27]](#cite-note-ibmtof-27)</sup> A working group for the [World Economic Forum](/wiki/World_Economic_Forum "World Economic Forum") met in November 2016 to discuss the development of [governance models](/wiki/Multistakeholder_governance_model "Multistakeholder governance model") related to blockchain.<sup>[[28]](#cite-note-forest-28)</sup> According to [Accenture](/wiki/Accenture "Accenture"), an application of the [diffusion of innovations](/wiki/Diffusion_of_innovations "Diffusion of innovations") theory suggests that blockchains attained a 13.5% adoption rate within financial services in 2016, therefore reaching the [early adopters](/wiki/Early_adopter "Early adopter") phase.<sup>[[29]](#cite-note-tfob-29)</sup> Industry trade groups joined to create the Global Blockchain Forum in 2016, an initiative of the [Chamber of Digital Commerce](/wiki/Chamber_of_Digital_Commerce "Chamber of Digital Commerce").<sup>[[30]](#cite-note-gbfl-30)</sup>

## Structure [[edit](/w/index.php?title=Blockchain&action=edit&section=2 "Edit section: Structure")]

A blockchain is a decentralized, distributed and public digital ledger that is used to record transactions across many computers so that the record cannot be altered retroactively without the alteration of all subsequent blocks and the collusion of the network.<sup>[[1]](#cite-note-te20151031-1)</sup><sup>[[31]](#cite-note-wired20161107-31)</sup> This allows the participants to verify and audit transactions inexpensively.<sup>[[32]](#cite-note-1-32)</sup> A blockchain database is managed autonomously using a [peer-to-peer](/wiki/Peer-to-peer "Peer-to-peer") network and a distributed timestamping server. They are [authenticated](/wiki/Authentication "Authentication") by [mass collaboration](/wiki/Mass_collaboration "Mass collaboration") powered by [collective](/wiki/Collective "Collective") [self-interests](/wiki/Self-interest "Self-interest").<sup>[[33]](#cite-note-hwb-33)</sup> The result is a [robust](/wiki/Robustness_(computer_science) "Robustness (computer science)") [workflow](/wiki/Workflow "Workflow") where participants' [uncertainty](/wiki/Uncertainty "Uncertainty") regarding data security is marginal. The use of a blockchain removes the characteristic of infinite [reproducibility](/wiki/Reproduction_(economics) "Reproduction (economics)") from a digital asset. It confirms that each unit of value was transferred only once, solving the long-standing problem of [double spending](/wiki/Double_spending "Double spending"). Blockchains have been described as a [value](/wiki/Value_(economics) "Value (economics)")-exchange [protocol](/wiki/Cryptographic_protocol "Cryptographic protocol").<sup>[[23]](#cite-note-bc20-23)</sup> This blockchain-based exchange of value can be completed more quickly, more safely and more cheaply than with traditional systems.<sup>[[34]](#cite-note-cbh-34)</sup> A blockchain can assign [title](/wiki/Title_(property) "Title (property)") rights because it provides a record that compels [offer and acceptance](/wiki/Offer_and_acceptance "Offer and acceptance").<sup>[[1]](#cite-note-te20151031-1)</sup>

### Blocks [[edit](/w/index.php?title=Blockchain&action=edit&section=3 "Edit section: Blocks")]

Blocks hold batches of valid [transactions](/wiki/Transaction_processing "Transaction processing") that are hashed and encoded into a [Merkle tree](/wiki/Merkle_tree "Merkle tree").<sup>[[1]](#cite-note-te20151031-1)</sup> Each block includes the [cryptographic hash](/wiki/Cryptographic_hash "Cryptographic hash") of the prior block in the blockchain, linking the two. The linked blocks form a chain.<sup>[[1]](#cite-note-te20151031-1)</sup> This [iterative](/wiki/Iteration "Iteration") process confirms the integrity of the previous block, all the way back to the original genesis block.<sup>[[35]](#cite-note-hadc-35)</sup>

Sometimes separate blocks can be produced concurrently, creating a temporary fork. In addition to a secure hash-based history, any blockchain has a specified algorithm for scoring different versions of the history so that one with a higher value can be selected over others. Blocks not selected for inclusion in the chain are called orphan blocks.<sup>[[35]](#cite-note-hadc-35)</sup> Peers supporting the database have different versions of the history from time to time. They only keep the highest-scoring version of the database known to them. Whenever a peer receives a higher-scoring version (usually the old version with a single new block added) they extend or overwrite their own database and retransmit the improvement to their peers. There is never an absolute guarantee that any particular entry will remain in the best version of the history forever. Because blockchains are typically built to add the score of new blocks onto old blocks and because there are incentives to work only on extending with new blocks rather than overwriting old blocks, the probability of an entry becoming superseded goes down exponentially<sup>[[36]](#cite-note-bsm-36)</sup> as more blocks are built on top of it, eventually becoming very low.<sup>[[1]](#cite-note-te20151031-1)</sup><sup>[[37]](#cite-note-t12-37)</sup><sup>:ch. 08</sup><sup>[[38]](#cite-note-paper-38)</sup> For example, in a blockchain using the [proof-of-work system](/wiki/Proof-of-work_system "Proof-of-work system"), the chain with the most cumulative proof-of-work is always considered the valid one by the network. There are a number of methods that can be used to demonstrate a sufficient level of [computation](/wiki/Computation "Computation"). Within a blockchain the computation is carried out redundantly rather than in the traditional segregated and [parallel](/wiki/Parallel_computing "Parallel computing") manner.<sup>[[39]](#cite-note-permbloc-39)</sup>

#### Block time [[edit](/w/index.php?title=Blockchain&action=edit&section=4 "Edit section: Block time")]

The _block time_ is the average time it takes for the network to generate one extra block in the blockchain.<sup>[[40]](#cite-note-40)</sup> Some blockchains create a new block as frequently as every five seconds.<sup>[[41]](#cite-note-drd-41)</sup> By the time of block completion, the included data becomes verifiable. In [cryptocurrency](/wiki/Cryptocurrency "Cryptocurrency"), this is practically when the money transaction takes place, so a shorter block time means faster transactions. The block time for [Ethereum](/wiki/Ethereum "Ethereum") is set to between 14 and 15 seconds, while for [bitcoin](/wiki/Bitcoin "Bitcoin") it is 10 minutes.<sup>[[42]](#cite-note-42)</sup>

#### Hard forks [[edit](/w/index.php?title=Blockchain&action=edit&section=5 "Edit section: Hard forks")]

This section is [transcluded](/wiki/Transclusion "Transclusion") from [Fork (blockchain)](/wiki/Fork_(blockchain) "Fork (blockchain)"). <small>([edit](//en.wikipedia.org/w/index.php?title=Fork_(blockchain)&action=edit) | [history](//en.wikipedia.org/w/index.php?title=Fork_(blockchain)&action=history))</small>

A _hard fork_ occurs when a blockchain splits into two incompatible separate chains. This is a consequence of the use of two incompatible sets of rules trying to govern the system.<sup>[[43]](#cite-note-hardfork-43)</sup> For example, [Ethereum](/wiki/Ethereum "Ethereum") has hard-forked to "make whole" the investors in [The DAO](/wiki/The_DAO_(organization) "The DAO (organization)"), which had been hacked by exploiting a vulnerability in its code.<sup>[[44]](#cite-note-44)</sup> In 2014 the [Nxt](/wiki/Nxt "Nxt") community was asked to consider a hard fork that would have led to a rollback of the blockchain records to mitigate the effects of a theft of 50 million NXT from a major cryptocurrency exchange. The hard fork proposal was rejected, and some of the funds were recovered after negotiations and ransom payment.<sup>[[45]](#cite-note-onxtd-45)</sup>

<br>

### Decentralization [[edit](/w/index.php?title=Blockchain&action=edit&section=6 "Edit section: Decentralization")]

By storing data across its network, the blockchain eliminates the risks that come with data being held centrally.<sup>[[1]](#cite-note-te20151031-1)</sup> The decentralized blockchain may use [ad-hoc](/wiki/Ad-hoc "Ad-hoc") [message passing](/wiki/Message_passing "Message passing") and [distributed networking](/wiki/Distributed_networking "Distributed networking").

Its network lacks centralized points of vulnerability that [computer crackers](/wiki/Security_hacker "Security hacker") can exploit; likewise, it has no central point of [failure](/wiki/Failure "Failure"). Blockchain security methods include the use of [public-key cryptography](/wiki/Public-key_cryptography "Public-key cryptography").<sup>[[4]](#cite-note-primer-4)</sup><sup>:5</sup> A _public key_ (a long, random-looking string of numbers) is an address on the blockchain. Value tokens sent across the network are recorded as belonging to that address. A _private key_ is like a password that gives its owner access to their digital assets or the means to otherwise interact with the various capabilities that blockchains now support. Data stored on the blockchain is generally considered incorruptible.<sup>[[1]](#cite-note-te20151031-1)</sup>

This is where blockchain has its advantage. While centralized data is more controllable, information and data manipulation are common. By decentralizing it, blockchain makes data transparent to everyone involved.<sup>[[46]](#cite-note-46)</sup>

Every [node](/wiki/Node_(networking) "Node (networking)") in a decentralized system has a copy of the blockchain. [Data quality](/wiki/Data_quality "Data quality") is maintained by massive database [replication](/wiki/Replication_(computing) "Replication (computing)")<sup>[[9]](#cite-note-decapp-9)</sup> and [computational trust](/wiki/Computational_trust "Computational trust"). No centralized "official" copy exists and no user is "trusted" more than any other.<sup>[[4]](#cite-note-primer-4)</sup> Transactions are broadcast to the network using software. Messages are delivered on a [best-effort](/wiki/Best-effort_delivery "Best-effort delivery") basis. Mining nodes validate transactions,<sup>[[35]](#cite-note-hadc-35)</sup> add them to the block they are building, and then [broadcast](/wiki/Broadcasting_(networking) "Broadcasting (networking)") the completed block to other nodes.<sup>[[37]](#cite-note-t12-37)</sup><sup>:ch. 08</sup> Blockchains use various time-stamping schemes, such as proof-of-work, to serialize changes.<sup>[[47]](#cite-note-kopstein-47)</sup> Alternate consensus methods include [proof-of-stake](/wiki/Proof-of-stake "Proof-of-stake").<sup>[[35]](#cite-note-hadc-35)</sup> Growth of a decentralized blockchain is accompanied by the risk of node centralization because the computer resources required to process larger amounts of data become more expensive.<sup>[[48]](#cite-note-48)</sup>

### Openness [[edit](/w/index.php?title=Blockchain&action=edit&section=7 "Edit section: Openness")]

Open blockchains are more [user-friendly](/wiki/Usability "Usability") than some traditional ownership records, which, while open to the public, still require physical access to view. Because all early blockchains were permissionless, controversy has arisen over the blockchain definition. An issue in this ongoing debate is whether a private system with verifiers tasked and authorized (permissioned) by a central authority should be considered a blockchain.<sup>[[49]](#cite-note-t16-49)</sup><sup>[[50]](#cite-note-t10-50)</sup><sup>[[51]](#cite-note-t11-51)</sup><sup>[[52]](#cite-note-t8-52)</sup><sup>[[53]](#cite-note-t9-53)</sup> Proponents of permissioned or private chains argue that the term "blockchain" may be applied to any data structure that batches data into time-stamped blocks. These blockchains serve as a distributed version of [multiversion concurrency control](/wiki/Multiversion_concurrency_control "Multiversion concurrency control") (MVCC) in databases.<sup>[[54]](#cite-note-t4-54)</sup> Just as MVCC prevents two transactions from concurrently modifying a single object in a database, blockchains prevent two transactions from spending the same single output in a blockchain.<sup>[[24]](#cite-note-tapscott201605-24)</sup><sup>:30–31</sup> Opponents say that permissioned systems resemble traditional corporate databases, not supporting decentralized data verification, and that such systems are not hardened against operator tampering and revision.<sup>[[49]](#cite-note-t16-49)</sup><sup>[[51]](#cite-note-t11-51)</sup> Nikolai Hampton of _ [Computerworld](/wiki/Computerworld "Computerworld")_ said that "many in-house blockchain solutions will be nothing more than cumbersome databases."<sup>[[55]](#cite-note-cw20160905-55)</sup> Business analysts [Don Tapscott](/wiki/Don_Tapscott "Don Tapscott") and [Alex Tapscott](/wiki/Alex_Tapscott "Alex Tapscott") define blockchain as a distributed ledger or database open to anyone.<sup>[[56]](#cite-note-hbr201605-56)</sup>

#### Permissionless [[edit](/w/index.php?title=Blockchain&action=edit&section=8 "Edit section: Permissionless")]

The great advantage to an open, permissionless, or public, blockchain network is that guarding against bad actors is not required and no [access control](/wiki/Access_control "Access control") is needed.<sup>[[36]](#cite-note-bsm-36)</sup> This means that applications can be added to the network without the approval or trust of others, using the blockchain as a [transport layer](/wiki/Transport_layer "Transport layer").<sup>[[36]](#cite-note-bsm-36)</sup>

[Bitcoin](/wiki/Bitcoin "Bitcoin") and other cryptocurrencies currently secure their blockchain by requiring new entries including a proof of work. To prolong the blockchain, bitcoin uses [Hashcash](/wiki/Hashcash "Hashcash") puzzles developed by [Adam Back](/wiki/Adam_Back "Adam Back") in the 1990s.<sup>[[57]](#cite-note-57)</sup>

Financial companies have not prioritised decentralized blockchains.<sup>[[58]](#cite-note-trtb-58)</sup> In 2016, [venture capital](/wiki/Venture_capital "Venture capital") investment for blockchain related projects was weakening in the USA but increasing in China.<sup>[[59]](#cite-note-btt17-59)</sup> [Bitcoin](/wiki/Bitcoin "Bitcoin") and many other cryptocurrencies use open (public) blockchains. As of January 2018<sup>[[update]](//en.wikipedia.org/w/index.php?title=Blockchain&action=edit)</sup>, bitcoin has the highest market capitalization.

#### Permissioned (private) blockchain [[edit](/w/index.php?title=Blockchain&action=edit&section=9 "Edit section: Permissioned (private) blockchain")]

Main article: [Distributed ledger](/wiki/Distributed_ledger "Distributed ledger")

Permissioned blockchains use an access control layer to govern who has access to the network.<sup>[[60]](#cite-note-btit-60)</sup> In contrast to public blockchain networks, validators on private blockchain networks are vetted by the network owner. They do not rely on anonymous nodes to validate transactions nor do they benefit from the [network effect](/wiki/Network_effect "Network effect").<sup>[[61]](#cite-note-snl-61)</sup><sup>[_ [better source needed](/wiki/Wikipedia:NOTRS "Wikipedia:NOTRS")_]</sup> Permissioned blockchains can also go by the name of 'consortium' or 'hybrid' blockchains.<sup>[[62]](#cite-note-62)</sup>

The _ [New York Times](/wiki/New_York_Times "New York Times")_ noted in both 2016 and 2017 that many corporations are using blockchain networks "with private blockchains, independent of the public system."<sup>[[63]](#cite-note-nyt20160327-63)</sup><sup>[[64]](#cite-note-64)</sup><sup>[_ [better source needed](/wiki/Wikipedia:NOTRS "Wikipedia:NOTRS")_]</sup>

#### Disadvantages [[edit](/w/index.php?title=Blockchain&action=edit&section=10 "Edit section: Disadvantages")]

Nikolai Hampton pointed out in _ [Computerworld](/wiki/Computerworld "Computerworld")_ that "There is also no need for a "51 percent" attack on a private blockchain, as the private blockchain (most likely) already controls 100 percent of all block creation resources. If you could attack or damage the blockchain creation tools on a private corporate server, you could effectively control 100 percent of their network and alter transactions however you wished."<sup>[[55]](#cite-note-cw20160905-55)</sup> This has a set of particularly profound adverse implications during a [financial crisis](/wiki/Financial_crisis "Financial crisis") or [debt crisis](/wiki/Debt_crisis "Debt crisis") like the [financial crisis of 2007–08](/wiki/Financial_crisis_of_2007%E2%80%9308 "Financial crisis of 2007–08"), where politically powerful actors may make decisions that favor some groups at the expense of others.<sup>[_ [citation needed](/wiki/Wikipedia:Citation_needed "Wikipedia:Citation needed")_]</sup> and "the bitcoin blockchain is protected by the massive group mining effort. It's unlikely that any private blockchain will try to protect records using gigawatts of computing power — it's time consuming and expensive."<sup>[[55]](#cite-note-cw20160905-55)</sup> He also said, "Within a private blockchain there is also no 'race'; there's no incentive to use more power or discover blocks faster than competitors. This means that many in-house blockchain solutions will be nothing more than cumbersome databases."<sup>[[55]](#cite-note-cw20160905-55)</sup>

## Uses [[edit](/w/index.php?title=Blockchain&action=edit&section=11 "Edit section: Uses")]

Blockchain technology can be integrated into multiple areas. The primary use of blockchains today is as a distributed ledger for [cryptocurrencies](/wiki/Cryptocurrency "Cryptocurrency"), most notably [bitcoin](/wiki/Bitcoin "Bitcoin").<sup>[[65]](#cite-note-cd-65)</sup> While a few [central banks](/wiki/Central_banks "Central banks"), in countries such as [China](/wiki/China "China"), [United States](/wiki/United_States "United States"), [Sweden](/wiki/Sweden "Sweden"), [Singapore](/wiki/Singapore "Singapore"), [South Africa](/wiki/South_Africa "South Africa") and [United Kingdom](/wiki/United_Kingdom "United Kingdom") are studying issuance of a Central Bank Issued Cryptocurrency (CICC), none have done so thus far.<sup>[[65]](#cite-note-cd-65)</sup>

### General potentials [[edit](/w/index.php?title=Blockchain&action=edit&section=12 "Edit section: General potentials")]

Blockchain technology has a large potential to transform business [operating models](/wiki/Operating_model "Operating model") in the long term. Blockchain distributed ledger technology is more a [foundational technology](/wiki/Foundational_innovation "Foundational innovation")—with the potential to create new foundations for global economic and social systems—than a [disruptive technology](/wiki/Disruptive_technology "Disruptive technology"), which typically "attack a traditional business model with a lower-cost solution and overtake incumbent firms quickly".<sup>[[8]](#cite-note-hbr201701-8)</sup> Even so, there are a few operational products maturing from [proof of concept](/wiki/Proof_of_concept "Proof of concept") by late 2016.<sup>[[59]](#cite-note-btt17-59)</sup> The use of blockchains promises to bring significant efficiencies to global [supply chains](/wiki/Supply_chain "Supply chain"), financial transactions, asset ledgers and decentralized social networking.<sup>[[8]](#cite-note-hbr201701-8)</sup>

As of 2016<sup>[[update]](//en.wikipedia.org/w/index.php?title=Blockchain&action=edit)</sup>, some observers remain skeptical. Steve Wilson, of Constellation Research, believes the technology has been [hyped](/wiki/Media_circus "Media circus") with unrealistic claims.<sup>[[66]](#cite-note-almeve-66)</sup> To mitigate [risk](/wiki/Risk_management "Risk management") businesses are reluctant to place blockchain at the core of the business structure.<sup>[[67]](#cite-note-clsdips-67)</sup>

This means specific blockchain applications may be a disruptive innovation, because substantially lower-cost solutions can be instantiated, which can disrupt existing business models.<sup>[[8]](#cite-note-hbr201701-8)</sup> Blockchain protocols facilitate businesses to use new methods of processing digital transactions.<sup>[[68]](#cite-note-blis-68)</sup> Examples include a payment system and [digital currency](/wiki/Digital_currency "Digital currency"), facilitating [crowdsales](/wiki/Crowdfunding "Crowdfunding"), or implementing [prediction markets](/wiki/Prediction_market "Prediction market") and generic [governance](/wiki/Governance "Governance") tools.<sup>[[69]](#cite-note-69)</sup>

Blockchains alleviate the need for a [trust service provider](/wiki/Trust_service_provider "Trust service provider") and are predicted to result in less [capital](/wiki/Capital_(economics) "Capital (economics)") being tied up in disputes. Blockchains have the potential to reduce [systemic risk](/wiki/Systemic_risk "Systemic risk") and financial [fraud](/wiki/Fraud "Fraud"). They automate processes that were previously time-consuming and done manually, such as the [incorporation](/wiki/Incorporation_(business) "Incorporation (business)") of businesses.<sup>[[70]](#cite-note-dbi-70)</sup> In theory, it would be possible to collect taxes, conduct conveyancing and provide risk management with blockchains.

As a distributed ledger, blockchain reduces the costs involved in verifying transactions, and by removing the need for trusted "third-parties" such as banks to complete transactions, the technology also lowers the cost of networking, therefore allowing several applications.<sup>[[32]](#cite-note-1-32)</sup>

Starting with a strong focus on financial applications, blockchain technology is extending to activities including decentralized applications and collaborative organizations that eliminate a middleman.<sup>[[71]](#cite-note-71)</sup><sup>[_ [non-primary source needed](/wiki/Wikipedia:No_original_research#Primary,_secondary_and_tertiary_sources "Wikipedia:No original research")_]</sup>

### Land registration [[edit](/w/index.php?title=Blockchain&action=edit&section=13 "Edit section: Land registration")]

"Land is a financial source, if people can prove they own it, they can borrow against it."

<cite>Emmanuel Noah, CEO of [Ghanian](/wiki/Ghana "Ghana") startup BenBen, _New York Observer_<sup>[[72]](#cite-note-72)</sup></cite>

Frameworks and trials such as the one at the Sweden Land Registry aim to demonstrate the effectiveness of the blockchain at speeding land sale deals.<sup>[[73]](#cite-note-swte-73)</sup> The Republic of Georgia is piloting a blockchain-based property registry.<sup>[[74]](#cite-note-repofg-74)</sup> The Ethical and Fair Creators Association uses blockchain to help startups protect their authentic ideas.<sup>[[75]](#cite-note-75)</sup>

The Government of India is fighting land fraud with the help of a blockchain.<sup>[[76]](#cite-note-76)</sup>

In October 2017, one of the first international property transactions was completed successfully using a blockchain-based [smart contract](/wiki/Smart_contract "Smart contract").<sup>[[77]](#cite-note-77)</sup>

In the first half of 2018, an experiment will be conducted on the use of blocking technology to monitor the reliability of the Unified State Real Estate Register (USRER) data in the territory of Moscow.<sup>[[78]](#cite-note-78)</sup>

### The Big Four [[edit](/w/index.php?title=Blockchain&action=edit&section=14 "Edit section: The Big Four")]

Each of the [Big Four accounting firms](/wiki/Big_Four_accounting_firms "Big Four accounting firms") is testing blockchain technologies in various formats. [Ernst & Young](/wiki/Ernst_%26_Young "Ernst & Young") has provided [cryptocurrency wallets](/wiki/Cryptocurrency_wallets "Cryptocurrency wallets") to all (Swiss) employees,<sup>[[79]](#cite-note-79)</sup> has installed a bitcoin ATM in their office in Switzerland, and accepts bitcoin as payment for all its consulting services.<sup>[[80]](#cite-note-ct15dec2016-80)</sup> Marcel Stalder, CEO of Ernst & Young Switzerland, stated, "We don't only want to talk about digitalization, but also actively drive this process together with our employees and our clients. It is important to us that everybody gets on board and prepares themselves for the revolution set to take place in the business world through blockchains, [to] smart contracts and digital currencies."<sup>[[80]](#cite-note-ct15dec2016-80)</sup> [PwC](/wiki/PwC "PwC"), [Deloitte](/wiki/Deloitte "Deloitte"), and [KPMG](/wiki/KPMG "KPMG") have taken a different path from Ernst & Young and are all testing private blockchains.<sup>[[80]](#cite-note-ct15dec2016-80)</sup>

### Smart contracts [[edit](/w/index.php?title=Blockchain&action=edit&section=15 "Edit section: Smart contracts")]

Blockchain-based [smart contracts](/wiki/Smart_contract "Smart contract") are contracts that can be partially or fully executed or enforced without human interaction.<sup>[[81]](#cite-note-unbi-81)</sup> One of the main objectives of a smart contract is [automated](/wiki/Automation "Automation") [escrow](/wiki/Escrow "Escrow"). The [IMF](/wiki/International_Monetary_Fund "International Monetary Fund") believes blockchains could reduce [moral hazards](/wiki/Moral_hazard "Moral hazard") and optimize the use of contracts in general.<sup>[[82]](#cite-note-vcab-82)</sup> Due to the lack of widespread use their legal status is unclear.<sup>[[82]](#cite-note-vcab-82)</sup>

Some blockchain implementations could enable the coding of contracts that will execute when specified conditions are met. A blockchain smart contract would be enabled by [extensible](/wiki/Extensible_programming "Extensible programming") programming instructions that define and execute an agreement.<sup>[[83]](#cite-note-bleforanew-83)</sup> For example, [Ethereum Solidity](/wiki/Solidity "Solidity") is an open-source blockchain project that was built specifically to realize this possibility by implementing a [Turing-complete](/wiki/Turing_complete "Turing complete") programming language capability to implement such contracts.<sup>[[24]](#cite-note-tapscott201605-24)</sup><sup>:ch. 11</sup>

### Nonprofit organizations [[edit](/w/index.php?title=Blockchain&action=edit&section=16 "Edit section: Nonprofit organizations")]

- Level One Project from the [Bill & Melinda Gates Foundation](/wiki/Bill_%26_Melinda_Gates_Foundation "Bill & Melinda Gates Foundation") aims to use blockchain technology to help the two billion people worldwide who lack bank accounts.<sup>[[84]](#cite-note-84)</sup><sup>[[85]](#cite-note-85)</sup>

- Building Blocks project from the [U.N.](/wiki/U.N. "U.N.")'s [World Food Programme](/wiki/World_Food_Programme "World Food Programme") (WFP) aims to make WFP's growing cash-based transfer operations faster, cheaper, and more secure. Building Blocks commenced field pilots in Pakistan in January 2017 that will continue throughout spring.<sup>[[86]](#cite-note-86)</sup><sup>[[87]](#cite-note-87)</sup>

### Decentralized networks [[edit](/w/index.php?title=Blockchain&action=edit&section=17 "Edit section: Decentralized networks")]

- The Backfeed project develops a distributed governance system for blockchain-based applications allowing for the collaborative creation and distribution of value in spontaneously emerging networks of peers.<sup>[[88]](#cite-note-88)</sup><sup>[[89]](#cite-note-89)</sup>

- The Alexandria project is a blockchain-based Decentralized Library.<sup>[[90]](#cite-note-90)</sup><sup>[[91]](#cite-note-91)</sup>

- Tezos is a blockchain project that governs itself by voting of its token holders.<sup>[[92]](#cite-note-92)</sup><sup>[[93]](#cite-note-93)</sup><sup>[[94]](#cite-note-94)</sup> [Bitcoin](/wiki/Bitcoin "Bitcoin") blockchain performs as a cryptocurrency and payment system. [Ethereum](/wiki/Ethereum "Ethereum") blockchain added [smart contract](/wiki/Smart_contract "Smart contract") system on top of a blockchain. Tezos blockchain will add an autonomy system – a decentralized code Development function on top of both bitcoin and Ethereum blockchains.<sup>[[95]](#cite-note-95)</sup>

### Governments and national currencies [[edit](/w/index.php?title=Blockchain&action=edit&section=18 "Edit section: Governments and national currencies")]

- The director of the Office of IT Schedule Contract Operations at the US General Services Administration, Mr. Jose Arrieta, disclosed at the 20 Sep ACT-IAC (American Council for Technology and Industry Advisory Council) Forum that its organization is using blockchain distributed ledger technology to speed up the FASt Lane process for IT Schedule 70 contracts through automation. Two companies, United Solutions (prime contractor) and Sapient Consulting (subcontractor) are developing for FASt Lane a prototype to automate and shorten the time required to perform the contract review process.<sup>[[96]](#cite-note-96)</sup>

- The Commercial Customs Operations Advisory Committee, a subcommittee of the [U.S. Customs and Border Protection](/wiki/U.S._Customs_and_Border_Protection "U.S. Customs and Border Protection"), is working on finding practical ways Blockchain could be implemented in its duties. [[1]](https://www.cbp.gov/sites/default/files/assets/documents/2017-Nov/Global%20Supply%20Chain%20Subcommittee%20Trade%20Executive%20Summary%20Nov%202017.pdf)

Companies have supposedly been suggesting blockchain-based currency solutions in the following two countries:

- e-Dinar, [Tunisia](/wiki/Tunisia "Tunisia")'s national currency, was the first state currency using blockchain technology.<sup>[[97]](#cite-note-97)</sup>

- eCFA is [Senegal](/wiki/Senegal "Senegal")'s blockchain-based national digital currency.<sup>[[98]](#cite-note-98)</sup>

Some countries, especially Australia, are providing keynote participation in identify the various technical issues associated with developing, governing and using blockchains:

<dl>
  <dd>In April 2016 Standards Australia submitted a New Field of Technical Activity (NFTA) proposal on behalf of Australia for the International Organization for Standardization (ISO) to consider developing standards to support blockchain technology. The proposal for an NFTA to the ISO was intended to establish a new ISO technical committee for blockchain. The new committee would be responsible for supporting innovation and competition by covering blockchain standards topics including interoperability, terminology, privacy, security and auditing.<sup>[[99]](#cite-note-99)</sup> There have been several media releases<sup>[[100]](#cite-note-100)</sup> supporting blockchain integration to Australian businesses.</dd>

</dl>

### Banks [[edit](/w/index.php?title=Blockchain&action=edit&section=19 "Edit section: Banks")]

[Don Tapscott](/wiki/Don_Tapscott "Don Tapscott") conducted a two-year research project exploring how blockchain technology can securely move and store host "money, titles, deeds, music, art, scientific discoveries, intellectual property, and even votes".<sup>[[56]](#cite-note-hbr201605-56)</sup> Furthermore, major portions of the [financial industry](/wiki/Financial_industry "Financial industry") are implementing [distributed ledgers](/wiki/Distributed_ledger "Distributed ledger") for use in [banking](/wiki/Banking "Banking"),<sup>[[101]](#cite-note-reason20160506-101)</sup><sup>[[102]](#cite-note-afr20160629-102)</sup> and according to a September 2016 [IBM](/wiki/IBM "IBM") study, this is occurring faster than expected.<sup>[[103]](#cite-note-dramatic-acceptance-of-blockchain-103)</sup>

Banks are interested in this technology because it has potential to speed up [back office](/wiki/Back_office "Back office") settlement systems.<sup>[[104]](#cite-note-inbl-104)</sup>

[Banks](/wiki/Bank "Bank") such as [UBS](/wiki/UBS "UBS") are opening new research labs dedicated to blockchain technology in order to explore how blockchain can be used in financial services to increase efficiency and reduce costs.<sup>[[105]](#cite-note-105)</sup><sup>[[106]](#cite-note-106)</sup>

Russia has officially completed its first government-level blockchain implementation. The state-run bank [Sberbank](/wiki/Sberbank "Sberbank") announced 20 December 2017 that it is partnering with Russia's Federal Antimonopoly Service (FAS) to implement document transfer and storage via blockchain.<sup>[[107]](#cite-note-107)</sup>

[Deloitte](/wiki/Deloitte "Deloitte") and [ConsenSys](/wiki/ConsenSys "ConsenSys") announced plans in 2016 to create a digital bank called Project ConsenSys.<sup>[[108]](#cite-note-108)</sup>

[R3](/wiki/R3_(company) "R3 (company)") connects 42 banks to distributed ledgers built by [Ethereum](/wiki/Ethereum "Ethereum"), Chain.com, [Intel](/wiki/Intel "Intel"), [IBM](/wiki/IBM "IBM") and [Monax](/wiki/Monax "Monax").<sup>[[109]](#cite-note-109)</sup>

A Swiss industry consortium, including [Swisscom](/wiki/Swisscom "Swisscom"), the [Zurich Cantonal Bank](/wiki/Zurich_Cantonal_Bank "Zurich Cantonal Bank") and the Swiss stock exchange, is prototyping [over-the-counter](/wiki/Over-the-counter_(finance) "Over-the-counter (finance)") asset trading on a blockchain-based Ethereum technology.<sup>[[110]](#cite-note-110)</sup>

### Other financial companies [[edit](/w/index.php?title=Blockchain&action=edit&section=20 "Edit section: Other financial companies")]

The credit and debits payments company [MasterCard](/wiki/MasterCard "MasterCard") has added three blockchain-based [APIs](/wiki/API "API") for programmers to use in developing both person-to-person (P2P) and [business-to-business](/wiki/Business-to-business "Business-to-business") (B2B) payment systems.<sup>[[111]](#cite-note-bi20161102-111)</sup>

[CLS Group](/wiki/CLS_Group "CLS Group") is using blockchain technology to expand the number of currency trade deals it can settle.<sup>[[67]](#cite-note-clsdips-67)</sup>

VISA payment systems,<sup>[[112]](#cite-note-112)</sup> Mastercard,<sup>[[113]](#cite-note-113)</sup> Unionpay and SWIFT<sup>[[114]](#cite-note-114)</sup> have announced the development and plans for using blockchain technology.

Prime Shipping Foundation is using blockchain technology to address issues related to the payments in the shipping industry.<sup>[[115]](#cite-note-115)</sup>

### Other uses [[edit](/w/index.php?title=Blockchain&action=edit&section=21 "Edit section: Other uses")]

Blockchain technology can be used to create a permanent, public, transparent ledger system for compiling data on sales, storing rights data by authenticating [copyright registration](/wiki/Copyright_registration "Copyright registration"),<sup>[[116]](#cite-note-fuusca-116)</sup> and tracking digital use and payments to content creators, such as musicians.<sup>[[117]](#cite-note-117)</sup> In 2017, IBM partnered with [ASCAP](/wiki/ASCAP "ASCAP") and [PRS for Music](/wiki/PRS_for_Music "PRS for Music") to adopt blockchain technology in music distribution.<sup>[[118]](#cite-note-118)</sup> [Imogen Heap](/wiki/Imogen_Heap "Imogen Heap")'s Mycelia<sup>[[119]](#cite-note-119)</sup> service, which allows managers to use a blockchain for tracking high-value parts moving through a [supply chain](/wiki/Supply_chain "Supply chain"), was launched as a concept in July 2016. Everledger is one of the inaugural clients of IBM's blockchain-based tracking service.<sup>[[120]](#cite-note-wsj20160714-120)</sup>

Kodak announced plans in 2018 to launch a digital token system for photograph copyright recording.<sup>[[121]](#cite-note-kodakcoin-121)</sup>

Another example where smart contracts are used is in the music industry. Every time a dj mix is played, the [smart contracts](/wiki/Smart_contract "Smart contract") attached to the dj mix pays the artists almost instantly.<sup>[[122]](#cite-note-122)</sup>

An application has been suggested for securing the spectrum sharing for wireless networks.<sup>[[123]](#cite-note-123)</sup>

New distribution methods are available for the [insurance](/wiki/Insurance "Insurance") industry such as [peer-to-peer insurance](/wiki/Peer-to-peer_insurance "Peer-to-peer insurance"), [parametric insurance](/wiki/Parametric_insurance "Parametric insurance") and [microinsurance](/wiki/Microinsurance "Microinsurance") following the adoption of blockchain.<sup>[[68]](#cite-note-blis-68)</sup> The [sharing economy](/wiki/Sharing_economy "Sharing economy") and [IoT](/wiki/Internet_of_Things "Internet of Things") are also set to benefit from blockchains because they involve many collaborating peers.<sup>[[124]](#cite-note-breac-124)</sup> [Online voting](/wiki/Online_voting "Online voting") is another application of the blockchain.<sup>[[125]](#cite-note-ovpfaq-125)</sup><sup>[[126]](#cite-note-126)</sup> Blockchains are being used to develop information systems for [medical records](/wiki/Medical_record "Medical record"), which increases [interoperability](/wiki/Interoperability "Interoperability"). In theory, legacy [disparate systems](/wiki/Disparate_system "Disparate system") can be completely replaced by blockchains.<sup>[[127]](#cite-note-bmbh-127)</sup> Blockchains are being developed for [data storage](/wiki/Computer_data_storage "Computer data storage"), publishing texts and identifying the origin of [digital art](/wiki/Digital_art "Digital art"). Blockchains facilitate users could take ownership of game assets ([digital assets](/wiki/Digital_asset "Digital asset")),an example of this is [Cryptokitties](/wiki/Cryptokitties "Cryptokitties").<sup>[[128]](#cite-note-128)</sup>

Notable non-cryptocurrency designs include:

- [Steemit](/wiki/Steemit "Steemit") – a blogging/social networking website and a cryptocurrency

- [Hyperledger](/wiki/Hyperledger "Hyperledger") – a cross-industry collaborative effort from the [Linux Foundation](/wiki/Linux_Foundation "Linux Foundation") to support blockchain-based distributed ledgers, with projects under this initiative including Hyperledger Burrow (by Monax) and Hyperledger Fabric (spearheaded by IBM)<sup>[[129]](#cite-note-129)</sup>

- [Counterparty](/wiki/Counterparty_(technology) "Counterparty (technology)") – an open source financial platform for creating peer-to-peer financial applications on the bitcoin blockchain

- Quorum – a permissionable private blockchain by [JPMorgan Chase](/wiki/JPMorgan_Chase "JPMorgan Chase") with private storage, used for contract applications<sup>[[130]](#cite-note-130)</sup>

- [Bitnation](/wiki/Bitnation "Bitnation") – a decentralized borderless "voluntary nation" establishing a jurisdiction of contracts and rules, based on Ethereum

- [Factom](/wiki/Factom "Factom"), a distributed registry

- Tezos, decentralized voting.<sup>[[24]](#cite-note-tapscott201605-24)</sup><sup>:94</sup>

[Microsoft Visual Studio](/wiki/Microsoft_Visual_Studio "Microsoft Visual Studio") is making the Ethereum Solidity language available to application developers.<sup>[[131]](#cite-note-131)</sup>

IBM offers a cloud blockchain service based on the open source [Hyperledger Fabric](/wiki/Hyperledger_Fabric "Hyperledger Fabric") project<sup>[[132]](#cite-note-132)</sup><sup>[[133]](#cite-note-133)</sup>

Oracle Cloud offers Blockchain Cloud Service based on [Hyperledger Fabric](/wiki/Hyperledger_Fabric "Hyperledger Fabric"). Oracle has joined the Hyperledger consortium.<sup>[[134]](#cite-note-134)</sup><sup>[[135]](#cite-note-135)</sup>

In August 2016, a research team at the [Technical University of Munich](/wiki/Technical_University_of_Munich "Technical University of Munich") published a research document about how blockchains may disrupt industries. They analyzed the [venture funding](/wiki/Venture_funding "Venture funding") that went into blockchain ventures. Their research shows that $1.55 billion went into [startups](/wiki/Startup_company "Startup company") with an industry focus on finance and insurance, information and communication, and professional services. High startup density was found in the USA, UK and Canada.<sup>[[136]](#cite-note-136)</sup>

[ABN Amro](/wiki/ABN_Amro "ABN Amro") announced a project in real estate to facilitate the sharing and recording of real estate transactions, and a second project in partnership with the [Port of Rotterdam](/wiki/Port_of_Rotterdam "Port of Rotterdam") to develop logistics tools.<sup>[[137]](#cite-note-137)</sup>

## Academic research [[edit](/w/index.php?title=Blockchain&action=edit&section=22 "Edit section: Academic research")]

Blockchain panel discussion at the first [IEEE Computer Society](/wiki/IEEE_Computer_Society "IEEE Computer Society") TechIgnite conference

In October 2014, the MIT Bitcoin Club, with funding from MIT alumni, provided undergraduate students at the [Massachusetts Institute of Technology](/wiki/Massachusetts_Institute_of_Technology "Massachusetts Institute of Technology") access to $100 of bitcoin. The adoption rates, as studied by Catalini and Tucker (2016), revealed that when people who typically adopt technologies early are given delayed access, they tend to reject the technology.<sup>[[138]](#cite-note-138)</sup>

### Journals [[edit](/w/index.php?title=Blockchain&action=edit&section=23 "Edit section: Journals")]

Main article: [Ledger (journal)](/wiki/Ledger_(journal) "Ledger (journal)")

In September 2015, the first peer-reviewed academic journal dedicated to [cryptocurrency](/wiki/Cryptocurrency "Cryptocurrency") and blockchain technology research, _Ledger_, was announced. The inaugural issue was published in December 2016.<sup>[[139]](#cite-note-extance2015-139)</sup><sup>[[140]](#cite-note-castillo2016-140)</sup> The journal covers aspects of [mathematics](/wiki/Mathematics "Mathematics"), [computer science](/wiki/Computer_science "Computer science"), [engineering](/wiki/Engineering "Engineering"), [law](/wiki/Law "Law"), [economics](/wiki/Economics "Economics") and [philosophy](/wiki/Philosophy "Philosophy") that relate to cryptocurrencies such as [bitcoin](/wiki/Bitcoin "Bitcoin").<sup>[[141]](#cite-note-141)</sup><sup>[[142]](#cite-note-hertig2015-142)</sup> There are also research platforms like Strategic coin that offer research for the blockchain and crypto space.

The journal encourages authors to [digitally sign](/wiki/Digital_signature "Digital signature") a [file hash](/wiki/Hash_function "Hash function") of submitted papers, which will then be [timestamped](/wiki/Trusted_timestamping "Trusted timestamping") into the bitcoin blockchain. Authors are also asked to include a personal bitcoin address in the first page of their papers.<sup>[[143]](#cite-note-143)</sup>

## Predictions [[edit](/w/index.php?title=Blockchain&action=edit&section=24 "Edit section: Predictions")]

A [World Economic Forum](/wiki/World_Economic_Forum "World Economic Forum") report from September 2015 predicted that by 2025 ten percent of global GDP would be stored on blockchains technology.<sup>[[144]](#cite-note-144)</sup><sup>[[145]](#cite-note-145)</sup>

In early 2017, [Harvard Business School](/wiki/Harvard_Business_School "Harvard Business School") professors [Marco Iansiti](/wiki/Marco_Iansiti "Marco Iansiti") and [Karim R. Lakhani](/wiki/Karim_R._Lakhani "Karim R. Lakhani") said the blockchain is not a [disruptive technology](/wiki/Disruptive_technology "Disruptive technology") that undercuts the cost of an existing business model, but is a [foundational technology](/wiki/Foundational_innovation "Foundational innovation") that "has the potential to create new foundations for our economic and social systems". They further predicted that, while foundational innovations can have enormous impact, "It will take decades for blockchain to seep into our economic and social infrastructure."<sup>[[8]](#cite-note-hbr201701-8)</sup>

## See also [[edit](/w/index.php?title=Blockchain&action=edit&section=25 "Edit section: See also")]

- [Information technology portal](/wiki/Portal:Information_technology "Portal:Information technology")
- [Cryptography portal](/wiki/Portal:Cryptography "Portal:Cryptography")
- [Economics portal](/wiki/Portal:Economics "Portal:Economics")
- [Computer science portal](/wiki/Portal:Computer_science "Portal:Computer science")
- [Changelog](/wiki/Changelog "Changelog") – a record of all notable changes made to a project
- [Checklist](/wiki/Checklist "Checklist") – an informational aid used to reduce failure

- [Economics of digitization](/wiki/Economics_of_digitization "Economics of digitization")
- [List of cryptocurrencies](/wiki/List_of_cryptocurrencies "List of cryptocurrencies")
- [List of emerging technologies](/wiki/List_of_emerging_technologies "List of emerging technologies")
## References [[edit](/w/index.php?title=Blockchain&action=edit&section=26 "Edit section: References")]

1. ^ [<sup>_**a**_</sup>](#cite-ref-te20151031-1-0) [<sup>_**b**_</sup>](#cite-ref-te20151031-1-1) [<sup>_**c**_</sup>](#cite-ref-te20151031-1-2) [<sup>_**d**_</sup>](#cite-ref-te20151031-1-3) [<sup>_**e**_</sup>](#cite-ref-te20151031-1-4) [<sup>_**f**_</sup>](#cite-ref-te20151031-1-5) [<sup>_**g**_</sup>](#cite-ref-te20151031-1-6) [<sup>_**h**_</sup>](#cite-ref-te20151031-1-7) [<sup>_**i**_</sup>](#cite-ref-te20151031-1-8) [<sup>_**j**_</sup>](#cite-ref-te20151031-1-9) [<sup>_**k**_</sup>](#cite-ref-te20151031-1-10) [<sup>_**l**_</sup>](#cite-ref-te20151031-1-11) [<sup>_**m**_</sup>](#cite-ref-te20151031-1-12) <cite>["Blockchains: The great chain of being sure about things"](https://www.economist.com/news/briefing/21677228-technology-behind-bitcoin-lets-people-who-do-not-know-or-trust-each-other-build-dependable). _ [The Economist](/wiki/The_Economist "The Economist")_. 31 October 2015 . Retrieved 18 June 2016. <q>The technology behind bitcoin lets people who do not know or trust each other build a dependable ledger. This has implications far beyond the crypto currency.</q></cite>

2. ** [^](#cite-ref-fortune20160515-2-0)** <cite>Morris, David Z. (15 May 2016). ["Leaderless, Blockchain-Based Venture Capital Fund Raises $100 Million, And Counting"](http://fortune.com/2016/05/15/leaderless-blockchain-vc-fund/). _ [Fortune](/wiki/Fortune_(magazine) "Fortune (magazine)")_. Retrieved 2016-05-23.</cite>

3. ^ [<sup>_**a**_</sup>](#cite-ref-nyt20160521-3-0) [<sup>_**b**_</sup>](#cite-ref-nyt20160521-3-1) <cite>Popper, Nathan (21 May 2016). ["A Venture Fund With Plenty of Virtual Capital, but No Capitalist"](https://www.nytimes.com/2016/05/22/business/dealbook/crypto-ether-bitcoin-currency.html). _ [The New York Times](/wiki/The_New_York_Times "The New York Times")_. Retrieved 2016-05-23.</cite>

4. ^ [<sup>_**a**_</sup>](#cite-ref-primer-4-0) [<sup>_**b**_</sup>](#cite-ref-primer-4-1) [<sup>_**c**_</sup>](#cite-ref-primer-4-2) [<sup>_**d**_</sup>](#cite-ref-primer-4-3) <cite>Brito, Jerry; Castillo, Andrea (2013). [Bitcoin: A Primer for Policymakers](http://mercatus.org/sites/default/files/Brito_BitcoinPrimer.pdf) (PDF) (Report). Fairfax, VA: Mercatus Center, George Mason University . Retrieved 22 October 2013.</cite>

5. ** [^](#cite-ref-obmh-5-0)** <cite>Trottier, Leo (18 June 2016). ["original-bitcoin"](https://github.com/trottier/original-bitcoin/blob/master/src/main.h#L795-L803) (self-published code collection). github . Retrieved 2016-06-18. <q>This is a historical repository of Satoshi Nakamoto's original bit coin sourcecode</q></cite>

6. ^ [<sup>_**a**_</sup>](#cite-ref-cryptocurrencytech-6-0) [<sup>_**b**_</sup>](#cite-ref-cryptocurrencytech-6-1) [<sup>_**c**_</sup>](#cite-ref-cryptocurrencytech-6-2) <cite>Narayanan, Arvind; Bonneau, Joseph; Felten, Edward; Miller, Andrew; Goldfeder, Steven (2016). _Bitcoin and cryptocurrency technologies: a comprehensive introduction_. Princeton: Princeton University Press. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-0-691-17169-2](/wiki/Special:BookSources/978-0-691-17169-2 "Special:BookSources/978-0-691-17169-2").</cite>

7. ** [^](#cite-ref-ipblockchain-7-0)** <cite>["Blockchain"](http://www.investopedia.com/terms/b/blockchain.asp). _Investopedia_. Retrieved 19 March 2016. <q>Based on the Bitcoin protocol, the blockchain database is shared by all nodes participating in a system.</q></cite>

8. ^ [<sup>_**a**_</sup>](#cite-ref-hbr201701-8-0) [<sup>_**b**_</sup>](#cite-ref-hbr201701-8-1) [<sup>_**c**_</sup>](#cite-ref-hbr201701-8-2) [<sup>_**d**_</sup>](#cite-ref-hbr201701-8-3) [<sup>_**e**_</sup>](#cite-ref-hbr201701-8-4) <cite>Iansiti, Marco; Lakhani, Karim R. (January 2017). ["The Truth About Blockchain"](https://hbr.org/2017/01/the-truth-about-blockchain). _ [Harvard Business Review](/wiki/Harvard_Business_Review "Harvard Business Review")_. [Harvard University](/wiki/Harvard_University "Harvard University"). Retrieved 2017-01-17. <q>The technology at the heart of bitcoin and other virtual currencies, blockchain is an open, distributed ledger that can record transactions between two parties efficiently and in a verifiable and permanent way.</q></cite>

9. ^ [<sup>_**a**_</sup>](#cite-ref-decapp-9-0) [<sup>_**b**_</sup>](#cite-ref-decapp-9-1) <cite>Raval, Siraj (2016). ["What Is a Decentralized Application?"](https://books.google.com/books?id=fvywDAAAQBAJ&pg=PA1). [_Decentralized Applications: Harnessing Bitcoin's Blockchain Technology_](https://books.google.com/books?id=fvywDAAAQBAJ). O'Reilly Media, Inc. pp. [1](https://books.google.com/books?id=fvywDAAAQBAJ&pg=PA1)–[2](https://books.google.com/books?id=fvywDAAAQBAJ&pg=PA2). [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-1-4919-2452-5](/wiki/Special:BookSources/978-1-4919-2452-5 "Special:BookSources/978-1-4919-2452-5"). [OCLC](/wiki/OCLC "OCLC") [968277125](//www.worldcat.org/oclc/968277125). Retrieved 6 November 2016 – via Google Books.</cite>

10. ** [^](#cite-ref-10)** <cite>Yuan, Ben; Lin, Wendy; McDonnell, Colin. ["Blockchains and electronic health records"](http://mcdonnell.mit.edu/blockchain_ehr.pdf) (PDF). _mcdonnell.mit.edu_.</cite>

11. ** [^](#cite-ref-11)** <cite>Ekblaw, Ariel; Azaria, Asaf (19 September 2016). ["MedRec: Medical Data Management on the Blockchain"](https://www.pubpub.org/pub/medrec). _PubPub_.</cite>

12. ** [^](#cite-ref-12)** <cite>Yurcan, Bryan (8 April 2016). ["How Blockchain Fits into the Future of Digital Identity"](https://www.americanbanker.com/news/how-blockchain-fits-into-the-future-of-digital-identity). _American Banker_. SourceMedia.</cite>

13. ** [^](#cite-ref-13)** <cite>Prisco, Giulio (3 June 2016). ["Microsoft Building Open Blockchain-Based Identity System With Blockstack, ConsenSys"](https://bitcoinmagazine.com/articles/microsoft-building-open-blockchain-based-identity-system-with-blockstack-consensys-1464968713/). _Bitcoin Magazine_. BTC Media LLC.</cite>

14. ** [^](#cite-ref-14)** <cite>Prisco, Giulio (18 August 2016). ["Department of Homeland Security Awards Blockchain Tech Development Grants for Identity Management and Privacy Protection"](https://bitcoinmagazine.com/articles/department-of-homeland-security-awards-blockchain-tech-development-grants-for-identity-management-and-privacy-protection-1471551442/). _Bitcoin Magazine_. BTC Media LLC.</cite>

15. ** [^](#cite-ref-15)** <cite>Browne, Ryan (22 August 2017). ["IBM partners with Nestle, Unilever and other food giants to trace food contamination with blockchain"](https://www.cnbc.com/2017/08/22/ibm-nestle-unilever-walmart-blockchain-food-contamination.html). CNBC.</cite>

16. ** [^](#cite-ref-16)** <cite>["What is Blockchain Technology?"](https://followmyvote.com/online-voting-technology/blockchain-technology/). _Follow My Vote_. Retrieved 18 December 2017.</cite>

17. ** [^](#cite-ref-17)** <cite>Haber, Stuart; Stornetta, W. Scott (January 1991). ["How to time-stamp a digital document"](https://link.springer.com/article/10.1007/BF00196791). _Journal of Cryptology_. **3** (2): 99–111 . Retrieved 4 July 2017.</cite>

18. ** [^](#cite-ref-18)** <cite>Bayer, Dave; Haber, Stuart; Stornetta, W. Scott (March 1992). ["Improving the Efficiency and Reliability of Digital Time-Stamping"](https://link.springer.com/chapter/10.1007/978-1-4613-9323-8_24). _Sequences_. **2**: 329–334 . Retrieved 4 July 2017.</cite>

19. ** [^](#cite-ref-19)** <cite>Mazières, David; Shasha, Dennis (July 2002). ["Building secure file systems out of Byzantine storage"](http://www.scs.stanford.edu/~dm/home/papers/mazieres:sundr-podc.ps.gz). _Proceedings of the Twenty-First ACM Symposium on Principles of Distributed Computing_. **2002**: 108–117.</cite>

20. ** [^](#cite-ref-20)** <cite>Tschorsch, Florian; Scheuermann, Bjorn. ["Bitcoin and Beyond: A Technical Survey on Decentralized Digital Currencies"](https://eprint.iacr.org/2015/464.pdf) (PDF). _IEEE Communications Surveys & Tutorials_. **18** (3): 2084–2123. [doi](/wiki/Digital_object_identifier "Digital object identifier"):[10.1109/COMST.2016.2535718](//doi.org/10.1109%2FCOMST.2016.2535718). Retrieved 3 February 2018.</cite>

21. ** [^](#cite-ref-hadi-21-0)** <cite>Nian, Lam Pak; Chuen, David LEE Kuo (2015). "A Light Touch of Regulation for Virtual Currencies". In Chuen, David LEE Kuo. _Handbook of Digital Currency: Bitcoin, Innovation, Financial Instruments, and Big Data_. Academic Press. p. 319. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-0-12-802351-8](/wiki/Special:BookSources/978-0-12-802351-8 "Special:BookSources/978-0-12-802351-8").</cite>

22. ** [^](#cite-ref-22)** <cite>["Blockchain Size"](https://blockchain.info/charts/blocks-size?timespan=3years). _Blockchain_. Blockchain Luxembourg S.A. [Archived](https://web.archive.org/web/20170303055245/https://blockchain.info/charts/blocks-size?timespan=3years) from the original on 2017-03-03.</cite>

23. ^ [<sup>_**a**_</sup>](#cite-ref-bc20-23-0) [<sup>_**b**_</sup>](#cite-ref-bc20-23-1) <cite>Bheemaiah, Kariappa (January 2015). ["Block Chain 2.0: The Renaissance of Money"](https://www.wired.com/insights/2015/01/block-chain-2-0/). _ [Wired](/wiki/Wired_(magazine) "Wired (magazine)")_. Retrieved 13 November 2016.</cite>

24. ^ [<sup>_**a**_</sup>](#cite-ref-tapscott201605-24-0) [<sup>_**b**_</sup>](#cite-ref-tapscott201605-24-1) [<sup>_**c**_</sup>](#cite-ref-tapscott201605-24-2) [<sup>_**d**_</sup>](#cite-ref-tapscott201605-24-3) <cite>[Tapscott, Don](/wiki/Don_Tapscott "Don Tapscott"); [Tapscott, Alex](/wiki/Alex_Tapscott "Alex Tapscott") (May 2016). _The Blockchain Revolution: How the Technology Behind Bitcoin is Changing Money, Business, and the World_. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-0-670-06997-2](/wiki/Special:BookSources/978-0-670-06997-2 "Special:BookSources/978-0-670-06997-2").</cite>

25. ** [^](#cite-ref-bletchleywp201609-25-0)** [Project Bletchley Whitepaper](https://github.com/Azure/azure-blockchain-projects/blob/master/bletchley/bletchley-whitepaper.md), Microsoft, 2016-09-19. Retrieved 2016-12-24.

26. ** [^](#cite-ref-26)** <cite>Yakovlev, Alexander (15 April 2016). ["НРД проголосовал за блокчейн"](http://bankir.ru/publikacii/20160415/nrd-progolosoval-za-blokchein-10007428/) [NSD blockchain vote]. _Bankir.ru_ (Interview) (in Russian). Interview with Kovlyagina, Tatiana . Retrieved 18 June 2016. <q>"Национальный расчетный депозитарий запустил пилотный проект на основе технологии распределенного реестра. Создание прототипа системы электронного голосования владельцев облигаций на блокчейне анонсировал на Биржевом форуме председатель правления НРД Эдди Астанин [The National Settlement Depository started the pilot project based on the technology of the distributed register. Creation of the prototype system of electronic voting for owners of bonds based on blockchain was announced at the Exchange forum by the chairman of the board of NSD, Eddie Astanin.]</q></cite>

27. ** [^](#cite-ref-ibmtof-27-0)** <cite>Williams, Ann (12 July 2016). ["IBM to open first blockchain innovation centre in Singapore, to create applications and grow new markets in finance and trade"](http://www.straitstimes.com/business/economy/ibm-to-open-first-blockchain-innovation-centre-in-singapore-to-create-applications). _The Straits Times_. Singapore Press Holdings Ltd. Co . Retrieved 13 November 2016.</cite>

28. ** [^](#cite-ref-forest-28-0)** <cite>Higgins, Stan (9 November 2016). ["Former Estonian President to Lead World Economic Forum Blockchain Group"](http://www.coindesk.com/estonia-president-world-economic-forum-blockchain/). _CoinDesk_. Retrieved 13 November 2016.</cite>

29. ** [^](#cite-ref-tfob-29-0)** <cite>["The future of blockchain in 8 charts"](http://raconteur.net/business/the-future-of-blockchain-in-8-charts). _Raconteur_. 27 June 2016 . Retrieved 3 December 2016.</cite>

30. ** [^](#cite-ref-gbfl-30-0)** <cite>Coleman, Lestor (12 April 2016). ["Global Blockchain Forum Launched to Coordinate Regulatory Interoperability and Best Practices"](https://www.cryptocoinsnews.com/global-blockchain-forum-launched/). _cryptoCoinNews_. Retrieved 4 December 2016.</cite>

31. ** [^](#cite-ref-wired20161107-31-0)** <cite>Armstrong, Stephen (7 November 2016). ["Move over Bitcoin, the blockchain is only just getting started"](https://www.wired.co.uk/article/unlock-the-blockchain). _ [Wired](/wiki/Wired_(magazine) "Wired (magazine)")_. Retrieved 2016-11-09.</cite>

32. ^ [<sup>_**a**_</sup>](#cite-ref-1-32-0) [<sup>_**b**_</sup>](#cite-ref-1-32-1) <cite>Catalini, Christian; Gans, Joshua S. (23 November 2016). "Some Simple Economics of the Blockchain". [doi](/wiki/Digital_object_identifier "Digital object identifier"):[10.2139/ssrn.2874598](//doi.org/10.2139%2Fssrn.2874598). [SSRN](/wiki/Social_Science_Research_Network "Social Science Research Network") [2874598](//ssrn.com/abstract=2874598) ![Freely accessible](//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Lock-green.svg/9px-Lock-green.svg.png "Freely accessible").</cite>

33. ** [^](#cite-ref-hwb-33-0)** <cite>[Tapscott, Don](/wiki/Don_Tapscott "Don Tapscott"); [Tapscott, Alex](/wiki/Alex_Tapscott "Alex Tapscott") (8 May 2016). ["Here's Why Blockchains Will Change the World"](http://fortune.com/2016/05/08/why-blockchains-will-change-the-world/). _Fortune_. Retrieved 16 November 2016.</cite>

34. ** [^](#cite-ref-cbh-34-0)** <cite>Tucci, Michele (29 November 2015). ["Can blockchain help the cards and payments industry?"](https://www.techinasia.com/talk/blockchain-cards-payments-industry). _Tech in Asia_. Retrieved 16 November 2016.</cite>

35. ^ [<sup>_**a**_</sup>](#cite-ref-hadc-35-0) [<sup>_**b**_</sup>](#cite-ref-hadc-35-1) [<sup>_**c**_</sup>](#cite-ref-hadc-35-2) [<sup>_**d**_</sup>](#cite-ref-hadc-35-3) <cite>Bhaskar, Nirupama Devi; Chuen, David Lee Kuo (2015). ["3 – Bitcoin Mining Technology"](http://www.sciencedirect.com/science/article/pii/B9780128021170000035). In Cheun, David Lee Kuo. [_Handbook of Digital Currency: Bitcoin, Innovation, Financial Instruments, and Big Data_](http://www.sciencedirect.com/science/book/9780128021170). Academic Press. pp. 47–51. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-0-12-802117-0](/wiki/Special:BookSources/978-0-12-802117-0 "Special:BookSources/978-0-12-802117-0"). Retrieved 2 December 2016 – via ScienceDirect.</cite>

36. ^ [<sup>_**a**_</sup>](#cite-ref-bsm-36-0) [<sup>_**b**_</sup>](#cite-ref-bsm-36-1) [<sup>_**c**_</sup>](#cite-ref-bsm-36-2) <cite>Antonopoulos, Andreas (20 February 2014). ["Bitcoin security model: trust by computation"](http://radar.oreilly.com/2014/02/bitcoin-security-model-trust-by-computation.html). _Radar_. O'Reilly . Retrieved 19 November 2016.</cite>

37. ^ [<sup>_**a**_</sup>](#cite-ref-t12-37-0) [<sup>_**b**_</sup>](#cite-ref-t12-37-1) <cite>Antonopoulos, Andreas M. (2014). [_Mastering Bitcoin. Unlocking Digital Cryptocurrencies_](http://chimera.labs.oreilly.com/books/1234000001802/ch01.html). Sebastopol, CA: O'Reilly Media. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [1449374034](/wiki/Special:BookSources/1449374034 "Special:BookSources/1449374034"). Retrieved 3 November 2015.</cite>

38. ** [^](#cite-ref-paper-38-0)** <cite>Nakamoto, Satoshi (October 2008). ["Bitcoin: A Peer-to-Peer Electronic Cash System"](https://bitcoin.org/bitcoin.pdf) (PDF). bitcoin.org . Retrieved 28 April 2014.</cite>

39. ** [^](#cite-ref-permbloc-39-0)** <cite>["Permissioned Blockchains"](https://monax.io/explainers/permissioned_blockchains/). _Explainer_. Monax . Retrieved 20 November 2016.</cite>

40. ** [^](#cite-ref-40)** <cite>Muhammad Ghayas. ["What does "Block Time" mean in cryptocurrency?"](https://www.quora.com/What-does-Block-Time-mean-in-cryptocurrency). _ [Quora](/wiki/Quora "Quora")_. Retrieved 2018-01-21.</cite>

41. ** [^](#cite-ref-drd-41-0)** <cite>Redman, Jamie (25 October 2016). ["Disney Reveals Dragonchain, an Interoperable Ledger"](https://news.bitcoin.com/disney-dragonchain-interoperable-ledger/). _Bitcoin.com_. Retrieved 4 December 2016.</cite>

42. ** [^](#cite-ref-42)** <cite>Antonio Madeira (2018-01-12). ["Why is Ethereum different to Bitcoin?"](https://www.cryptocompare.com/coins/guides/why-is-ethereum-different-to-bitcoin/). _CryptoCompare_.</cite>

43. ** [^](#cite-ref-hardfork-43-0)** <cite>Hayes, Adam (21 March 2017). ["Can Bitcoin Hard Fork?"](http://www.investopedia.com/news/can-bitcoin-hardfork/). _Investopedia_. Retrieved 8 June 2017.</cite>

44. ** [^](#cite-ref-44)** <cite>Coppola, Frances (21 July 2016). ["A Painful Lesson For The Ethereum Community"](https://www.forbes.com/sites/francescoppola/2016/07/21/a-painful-lesson-for-the-ethereum-community/#31abce3d5714). _Forbes_.</cite>

45. ** [^](#cite-ref-onxtd-45-0)** <cite>Gillespie, Clay Michael (15 August 2014). ["Official NXT Decision: No Blockchain Rollback"](https://www.cryptocoinsnews.com/official-nxt-decision-blockchain-rollback/). _Cryptocoin News_. Retrieved 13 November 2016.</cite>

46. ** [^](#cite-ref-46)** <cite>["How Blockchain Technology Can Change The Way Modern Businesses Work"](https://www.eyerys.com/articles/how-blockchain-technology-can-changes-how-modern-businesses-work/). _Eyerys_. Retrieved 19 October 2017.</cite>

47. ** [^](#cite-ref-kopstein-47-0)** <cite>Kopfstein, Janus (12 December 2013). ["The Mission to Decentralize the Internet"](http://www.newyorker.com/tech/elements/the-mission-to-decentralize-the-internet). _ [The New Yorker](/wiki/The_New_Yorker "The New Yorker")_. Retrieved 30 December 2014. <q>The network's 'nodes'—users running the bitcoin software on their computers—collectively check the integrity of other nodes to ensure that no one spends the same coins twice. All transactions are published on a shared public ledger, called the 'block chain.'</q></cite>

48. ** [^](#cite-ref-48)** <cite>Gervais, Arthur; Karame, Ghassan O.; Capkun, Vedran; Capkun, Srdjan. ["Is Bitcoin a Decentralized Currency?"](https://www.infoq.com/articles/is-bitcoin-a-decentralized-currency/). _InfoQ_. InfoQ & IEEE computer society . Retrieved 11 October 2016.</cite>

49. ^ [<sup>_**a**_</sup>](#cite-ref-t16-49-0) [<sup>_**b**_</sup>](#cite-ref-t16-49-1) <cite>Voorhees, Erik (30 October 2015). ["It's All About the Blockchain"](http://moneyandstate.com/its-all-about-the-blockchain/). _Money and State_. Retrieved 2015-11-02.</cite>

50. ** [^](#cite-ref-t10-50-0)** <cite>Reutzel, Bailey (13 July 2015). ["A Very Public Conflict Over Private Blockchains"](http://www.paymentssource.com/news/technology/a-very-public-confluct-over-private-blockchains-3021831-1.html). _PaymentsSource_. New York, NY: SourceMedia, Inc . Retrieved 18 June 2016.</cite>

51. ^ [<sup>_**a**_</sup>](#cite-ref-t11-51-0) [<sup>_**b**_</sup>](#cite-ref-t11-51-1) <cite>Casey, Michael J. (15 April 2015). ["Moneybeat/BitBeat: Blockchains Without Coins Stir Tensions in Bitcoin Community"](https://blogs.wsj.com/moneybeat/2015/04/14/bitbeat-blockchains-without-coins-stir-tensions-in-bitcoin-community/). _ [The Wall Street Journal](/wiki/The_Wall_Street_Journal "The Wall Street Journal")_. Retrieved 18 June 2016.</cite>

52. ** [^](#cite-ref-t8-52-0)** <cite>["The 'Blockchain Technology' Bandwagon Has A Lesson Left To Learn"](http://news.dinbits.com/2015/11/the-blockchain-technology-bandwagon-has.html). _dinbits.com_. 3 November 2015 . Retrieved 2016-06-18.</cite>

53. ** [^](#cite-ref-t9-53-0)** <cite>DeRose, Chris (26 June 2015). ["Why the Bitcoin Blockchain Beats Out Competitors"](http://www.americanbanker.com/bankthink/why-the-bitcoin-blockchain-beats-out-competitors-1075100-1.html). _American Banker_. Retrieved 18 June 2016.</cite>

54. ** [^](#cite-ref-t4-54-0)** <cite>Greenspan, Gideon (19 July 2015). ["Ending the bitcoin vs blockchain debate"](http://www.multichain.com/blog/2015/07/bitcoin-vs-blockchain-debate/). _multichain.com_. Retrieved 2016-06-18.</cite>

55. ^ [<sup>_**a**_</sup>](#cite-ref-cw20160905-55-0) [<sup>_**b**_</sup>](#cite-ref-cw20160905-55-1) [<sup>_**c**_</sup>](#cite-ref-cw20160905-55-2) [<sup>_**d**_</sup>](#cite-ref-cw20160905-55-3) <cite>Hampton, Nikolai (5 September 2016). ["Understanding the blockchain hype: Why much of it is nothing more than snake oil and spin"](http://www.computerworld.com.au/article/606253/understanding-blockchain-hype-why-much-it-nothing-more-than-snake-oil-spin/). _ [Computerworld](/wiki/Computerworld "Computerworld")_. Retrieved 2016-09-05.</cite>

56. ^ [<sup>_**a**_</sup>](#cite-ref-hbr201605-56-0) [<sup>_**b**_</sup>](#cite-ref-hbr201605-56-1) <cite>Tapscott, Don (10 May 2016). ["The Impact of the Blockchain Goes Beyond Financial Services"](https://hbr.org/2016/05/the-impact-of-the-blockchain-goes-beyond-financial-services). _ [Harvard Business Review](/wiki/Harvard_Business_Review "Harvard Business Review")_. Retrieved 16 May 2016.</cite>

57. ** [^](#cite-ref-57)** <cite>Blocki, Jeremiah (24 August 2016). ["Designing Proof of Human-work Puzzles for Cryptocurrency and Beyond∗"](https://eprint.iacr.org/2016/145.pdf) (PDF). _International Association for Cryptologic Research (IACR)_. Retrieved 2016-11-20.</cite>

58. ** [^](#cite-ref-trtb-58-0)** <cite>Buntinx, J.P. (1 May 2016). ["The Road To Bitcoin Adoption Passes Through Many Stages"](http://www.newsbtc.com/2016/05/01/road-bitcoin-adoption-passes-many-stages/). _News BTC_. Retrieved 4 December 2016.</cite>

59. ^ [<sup>_**a**_</sup>](#cite-ref-btt17-59-0) [<sup>_**b**_</sup>](#cite-ref-btt17-59-1) <cite>Ovenden, James. ["Blockchain Top Trends In 2017"](https://channels.theinnovationenterprise.com/articles/blockchain-top-trends-in-2017). The Innovation Enterprise . Retrieved 4 December 2016.</cite>

60. ** [^](#cite-ref-btit-60-0)** <cite>Bob Marvin (30 August 2017). ["Blockchain: The Invisible Technology That's Changing the World"](http://au.pcmag.com/amazon-web-services/46389/feature/blockchain-the-invisible-technology-thats-changing-the-world). _PC MAG Australia_. ZiffDavis, LLC . Retrieved 25 September 2017.</cite>

61. ** [^](#cite-ref-snl-61-0)** <cite>Prisco, Giulio (25 August 2016). ["Sandia National Laboratories Joins the War on Bitcoin Anonymity"](https://bitcoinmagazine.com/articles/sandia-national-laboratories-joins-the-war-on-bitcoin-anonymity-1472151009). _Bitcoin Magazine_. BTC Inc . Retrieved 21 November 2016.</cite>

62. ** [^](#cite-ref-62)** <cite>["Blockchains & Distributed Ledger Technologies"](https://blockchainhub.net/blockchains-and-distributed-ledger-technologies-in-general/). _BlockchainHub_. Retrieved 2018-01-18.</cite>

63. ** [^](#cite-ref-nyt20160327-63-0)** <cite>Popper, Nathan (27 March 2016). ["Ethereum, a Virtual Currency, Enables Transactions That Rival Bitcoin's"](https://www.nytimes.com/2016/03/28/business/dealbook/ethereum-a-virtual-currency-enables-transactions-that-rival-bitcoins.html). _ [The New York Times](/wiki/The_New_York_Times "The New York Times")_. Retrieved 2017-02-07.</cite>

64. ** [^](#cite-ref-64)** <cite>Popper, Nathaniel (27 February 2017). ["Business Giants to Announce Creation of a Computing System Based on Ethereum"](https://www.nytimes.com/2017/02/27/business/dealbook/ethereum-alliance-business-banking-security.html) – via _The New York Times_.</cite>

65. ^ [<sup>_**a**_</sup>](#cite-ref-cd-65-0) [<sup>_**b**_</sup>](#cite-ref-cd-65-1) <cite>Ehsani, Farzam (22 December 2016). ["Blockchain in Finance: From Buzzword to Watchword in 2016"](http://www.coindesk.com/blockchain-finance-buzzword-watchword-2016/). _CoinDesk_ (News). Retrieved 22 December 2016.</cite>

66. ** [^](#cite-ref-almeve-66-0)** <cite>Wilson, Steve (3 May 2016). ["Blockchain: Almost Everything You Read Is Wrong"](https://www.constellationr.com/blog-news/blockchain-almost-everything-you-read-wrong). Constellation Research Inc . Retrieved 13 November 2016.</cite>

67. ^ [<sup>_**a**_</sup>](#cite-ref-clsdips-67-0) [<sup>_**b**_</sup>](#cite-ref-clsdips-67-1) <cite>Katie Martin (27 September 2016). ["CLS dips into blockchain to net new currencies"](https://www.ft.com/content/c905b6fc-4dd2-3170-9d2a-c79cdbb24f16). _Financial Times_. Retrieved 7 November 2016.</cite>

68. ^ [<sup>_**a**_</sup>](#cite-ref-blis-68-0) [<sup>_**b**_</sup>](#cite-ref-blis-68-1) <cite>Wang, Kevin; Safavi, Ali (29 October 2016). ["Blockchain is empowering the future of insurance"](https://techcrunch.com/2016/10/29/blockchain-is-empowering-the-future-of-insurance/). _Tech Crunch_. AOL Inc . Retrieved 7 November 2016.</cite>

69. ** [^](#cite-ref-69)** <cite>["New Ethereum Blockchain Consortium Could Run on Experimental Tech – CoinDesk"](http://www.coindesk.com/ethereums-new-blockchain-consortium-run-experimental-tech/). 21 February 2017.</cite>

70. ** [^](#cite-ref-dbi-70-0)** <cite>Prisco, Giulio (9 May 2016). ["Delaware Blockchain Initiative to Streamline Record-Keeping for Private Companies"](https://bitcoinmagazine.com/articles/delaware-blockchain-initiative-to-streamline-record-keeping-for-private-companies-1462812187). _Bitcoin Magazine_. BTC Inc . Retrieved 5 December 2016.</cite>

71. ** [^](#cite-ref-71)** <cite>De Filippi, Primavera. [_From competition to cooperation_](https://www.youtube.com/watch?v=aYOPcHRO3tc). TEDxCambridge . Retrieved 8 October 2015.</cite>

72. ** [^](#cite-ref-72)** <cite>Dale, Brady (10 May 2016). ["Three Small Economies Where Land Title Could Use Blockchain to Leapfrog the US"](http://observer.com/2016/10/benben-factom-bitfury-ghana-georgia-honduras/). _ [New York Observer](/wiki/New_York_Observer "New York Observer")_. Retrieved 2017-09-22.</cite>

73. ** [^](#cite-ref-swte-73-0)** <cite>Chavez-Dreyfuss, Gertrude (16 June 2016). ["Sweden tests blockchain technology for land registry"](https://www.reuters.com/article/us-sweden-blockchain-idUSKCN0Z22KV). Reuters . Retrieved 7 November 2016.</cite>

74. ** [^](#cite-ref-repofg-74-0)** <cite>Shin, Laura (21 April 2016). ["Republic Of Georgia To Pilot Land Titling On Blockchain With Economist Hernando De Soto, BitFury"](https://www.forbes.com/sites/laurashin/2016/04/21/republic-of-georgia-to-pilot-land-titling-on-blockchain-with-economist-hernando-de-soto-bitfury/). _Forbes_. Retrieved 13 November 2016.</cite>

75. ** [^](#cite-ref-75)** <cite>["The Ethical and Fair Creators Association"](http://macrostarter.net). Retrieved 2 December 2016.</cite>

76. ** [^](#cite-ref-76)** <cite>["Indian State Uses Blockchain Technology to Stop Land Ownership Fraud"](https://cointelegraph.com/news/indian-state-uses-blockchain-technology-to-stop-land-ownership-fraud).</cite>

77. ** [^](#cite-ref-77)** [https://medium.com/@tradersnow/how-i-sold-5-acres-of-land-using-bitbays-trustless-smart-contracts-28f18b83125](https://medium.com/@tradersnow/how-i-sold-5-acres-of-land-using-bitbays-trustless-smart-contracts-28f18b83125)

78. ** [^](#cite-ref-78)** <cite>Meyer, David (20 October 2017). ["Russia experiments with using blockchain tech for land registry: Pilot project uses blockchain in Moscow"](http://www.zdnet.com/article/russia-experiments-with-using-blockchain-tech-for-land-registry/). ZDNet . Retrieved 17 November 2017.</cite>

79. ** [^](#cite-ref-79)** <cite>Karin Kirchner (25 November 2016). ["EY Switzerland to digitalize itself and become first advisory firm to accept Bitcoins for its services"](http://www.ey.com/Publication/vwLUAssets/ey-news-release-switzerland-accepts-bitcoins-for-payment-of-its-services/$FILE/ey-news-release-switzerland-accepts-bitcoins-for-payment-of-its-services.pdf) (PDF) (Press release). [Ernst & Young](/wiki/Ernst_%26_Young "Ernst & Young").</cite>

80. ^ [<sup>_**a**_</sup>](#cite-ref-ct15dec2016-80-0) [<sup>_**b**_</sup>](#cite-ref-ct15dec2016-80-1) [<sup>_**c**_</sup>](#cite-ref-ct15dec2016-80-2) <cite>Young, Joesph (15 December 2016). ["Ernst & Young Is Going Bitcoin While PwC, Deloitte and KPMG Push Permissioned Blockchains"](https://cointelegraph.com/news/ernst-young-is-going-bitcoin-while-pwc-deloitte-and-kpmg-push-permissioned-blockchains). _CoinTelegraph.com_. Retrieved 17 December 2016.</cite>

81. ** [^](#cite-ref-unbi-81-0)** <cite>Franco, Pedro (2014). [_Understanding Bitcoin: Cryptography, Engineering and Economics_](https://books.google.com/books?id=YHfCBwAAQBAJ). John Wiley & Sons. p. 9. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-1-119-01916-9](/wiki/Special:BookSources/978-1-119-01916-9 "Special:BookSources/978-1-119-01916-9"). Retrieved 4 January 2017 – via Google Books.</cite>

82. ^ [<sup>_**a**_</sup>](#cite-ref-vcab-82-0) [<sup>_**b**_</sup>](#cite-ref-vcab-82-1) <cite>[_Virtual Currencies and Beyond: Initial Considerations_](https://play.google.com/store/books/details?id=ttt_CwAAQBAJ). IMF Discussion Note. [International Monetary Fund](/wiki/International_Monetary_Fund "International Monetary Fund"). 2016. p. 23. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-1-5135-5297-2](/wiki/Special:BookSources/978-1-5135-5297-2 "Special:BookSources/978-1-5135-5297-2"). Retrieved 12 November 2016 – via Google Play.</cite>

83. ** [^](#cite-ref-bleforanew-83-0)** <cite>Swan, Melanie (2015). [_Blockchain: Blueprint for a New Economy_](https://books.google.com/books?id=RHJmBgAAQBAJ). O'Reilly Media, Inc. p. 16. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-1-4919-2047-3](/wiki/Special:BookSources/978-1-4919-2047-3 "Special:BookSources/978-1-4919-2047-3"). Retrieved 12 November 2016 – via Google Books.</cite>

84. ** [^](#cite-ref-84)** <cite>["Level One Project"](https://leveloneproject.org/). [Bill & Melinda Gates Foundation](/wiki/Bill_%26_Melinda_Gates_Foundation "Bill & Melinda Gates Foundation").</cite>

85. ** [^](#cite-ref-85)** <cite>Woyke, Elizabeth (18 April 2017). ["How Blockchain Can Bring Financial Services to the Poor"](https://www.technologyreview.com/s/604144/how-blockchain-can-lift-up-the-worlds-poor/). [MIT Technology Review](/wiki/MIT_Technology_Review "MIT Technology Review").</cite>

86. ** [^](#cite-ref-86)** <cite>["Building Blocks"](http://innovation.wfp.org/project/building-blocks/). [World Food Program](/wiki/World_Food_Program "World Food Program"). 1 January 2017.</cite>

87. ** [^](#cite-ref-87)** <cite>["What is 'Blockchain' and How is it Connected to Fighting Hunger?"](https://insight.wfp.org/what-is-blockchain-and-how-is-it-connected-to-fighting-hunger-7f1b42da9fe/). [World Food Programme](/wiki/World_Food_Programme "World Food Programme"). 6 March 2017.</cite>

88. ** [^](#cite-ref-88)** <cite>["Backfeed"](http://backfeed.cc/). Backfeed.</cite>

89. ** [^](#cite-ref-89)** <cite>Pazaitis, Alex (1 January 2017). ["Blockchain and Value Systems in the Sharing Economy: The Illustrative Case of Backfeed"](http://technologygovernance.eu/files/main/2017012509590909.pdf) (PDF). [Technology governance](/wiki/Technology_governance "Technology governance").</cite>

90. ** [^](#cite-ref-90)** <cite>["Alexandria"](http://www.alexandria.io/). Alexandria.</cite>

91. ** [^](#cite-ref-91)** <cite>Porup, J. M. (29 June 2015). ["Could Cyberwar Cause a Library of Alexandria Event?"](https://motherboard.vice.com/en_us/article/could-cyberwar-cause-a-library-of-alexandria-event). _ [Vice](/wiki/Vice_(magazine) "Vice (magazine)")_.</cite>

92. ** [^](#cite-ref-92)** <cite>["Tezos: The self-amending cryptographic ledger"](https://www.tezos.com/static/papers/Tezos_Overview.pdf) (PDF). Tezos.</cite>

93. ** [^](#cite-ref-93)** <cite>["A self-amending cryptographic ledger"](https://github.com/tezos/tezos/). [GitHub](/wiki/GitHub "GitHub").</cite>

94. ** [^](#cite-ref-94)** <cite>Metz, Cade (29 March 2017). ["A Plan to Save Blockchain Democracy From Bitcoin's Civil War"](https://www.wired.com/2017/03/plan-save-blockchain-democracy-bitcoins-civil-war/). _ [Wired](/wiki/Wired_(magazine) "Wired (magazine)")_.</cite>

95. ** [^](#cite-ref-95)** <cite>Madore, P. H. (12 May 2017). ["ICO Analysis: Tezos"](https://hacked.com/ico-analysis-tezos/). Hacked.</cite>

96. ** [^](#cite-ref-96)** <cite>Friedman, Sara (21 September 2017). ["GSA looks to blockchain for speeding procurement processes"](https://gcn.com/articles/2017/09/21/gsa-looks-to-blockchain-for-procurement.aspx). _Government Computer News_.</cite>

97. ** [^](#cite-ref-97)** <cite>["Tunisia To Replace eDinar With Blockchain-Based Currency"](http://www.econotimes.com/Tunisia-To-Replace-eDinar-With-Blockchain-Based-Currency-140836). EconoTimes. 11 January 2016.</cite>

98. ** [^](#cite-ref-98)** <cite>["Senegal To Introduce A New Blockchain-Based National Digital Currency, The Second Such Currency In The World"](https://www.iafrikan.com/2016/11/24/senegal-to-introduce-a-new-blockchain-based-national-digital-currency-making-it-only-the-second-country-to-have-a-national-digital-currency/). iAfrikan News. 24 November 2016.</cite>

99. ** [^](#cite-ref-99)** Last RoadMap of Australia, [http://www.standards.org.au/OurOrganisation/News/Documents/Roadmap_for_Blockchain_Standards_report.pdf](http://www.standards.org.au/OurOrganisation/News/Documents/Roadmap_for_Blockchain_Standards_report.pdf)

100. ** [^](#cite-ref-100)** <cite>["Why Blockchain will change Australian businesses for ever"](http://www.nbc-2.com/story/37236372/why-blockchain-will-change-australian-businesses-for-ever). _NBC-2.com_. Retrieved 2018-02-03.</cite>

101. ** [^](#cite-ref-reason20160506-101-0)** <cite>Epstein, Jim (6 May 2016). ["Is Blockchain Technology a Trojan Horse Behind Wall Street's Walled Garden?"](http://reason.com/reasontv/2016/05/06/bitcoin-consensus-blockchain-wall-street). _ [Reason](/wiki/Reason_(magazine) "Reason (magazine)")_. Retrieved 2016-06-29. <q>mainstream misgivings about working with a system that's open for anyone to use. Many banks are partnering with companies building so-called private blockchains that mimic some aspects of Bitcoin's architecture except they're designed to be closed off and accessible only to chosen parties. ... [but some believe] that open and permission-less blockchains will ultimately prevail even in the banking sector simply because they're more efficient.</q></cite>

102. ** [^](#cite-ref-afr20160629-102-0)** <cite>Redrup, Yolanda (29 June 2016). ["ANZ backs private blockchain, but won't go public"](http://www.afr.com/technology/anz-backs-private-blockchain-but-wont-go-public-20160629-gpuf9z). _Australia Financial Review_. Retrieved 2016-07-07. <q>Blockchain networks can be either public or private. Public blockchains have many users and there are no controls over who can read, upload or delete the data and there are an unknown number of pseudonymous participants. In comparison, private blockchains also have multiple data sets, but there are controls in place over who can edit data and there are a known number of participants.</q></cite>

103. ** [^](#cite-ref-dramatic-acceptance-of-blockchain-103-0)** <cite>Kelly, Jemima (28 September 2016). ["Banks adopting blockchain 'dramatically faster' than expected: IBM"](https://www.reuters.com/article/us-tech-blockchain-ibm-idUSKCN11Y28D). Reuters . Retrieved 2016-09-28.</cite>

104. ** [^](#cite-ref-inbl-104-0)** <cite>Arnold, Martin (23 September 2013). ["IBM in blockchain project with China UnionPay"](https://www.ft.com/content/719f4e7e-80e1-11e6-bc52-0c7211ef3198). _Financial Times_. Retrieved 7 November 2016.</cite>

105. ** [^](#cite-ref-105)** <cite>["UBS leads team of banks working on blockchain settlement system"](https://www.reuters.com/article/us-banks-blockchain-ubs-idUSKCN10Z147). [Reuters](/wiki/Reuters "Reuters"). 24 August 2016 . Retrieved 13 May 2017.</cite>

106. ** [^](#cite-ref-106)** <cite>["Cryptocurrency Blockchain"](https://www.capgemini.com/beyond-the-buzz/cryptocurrency-blockchain). _capgemini.com_. Retrieved 13 May 2017.</cite>

107. ** [^](#cite-ref-107)** <cite>["First Government Blockchain Implementation For Russia"](https://cointelegraph.com/news/first-government-blockchain-implementation-for-russia). Cointelegraph . Retrieved 20 December 2017.</cite>

108. ** [^](#cite-ref-108)** <cite>Allison, Ian (3 May 2016). ["Deloitte to build Ethereum-based 'digital bank' with New York City's ConsenSys"](http://www.ibtimes.co.uk/deloitte-build-ethereum-based-digital-bank-new-york-citys-consensys-1557864). _ [International Business Times](/wiki/International_Business_Times "International Business Times")_.</cite>

109. ** [^](#cite-ref-109)** <cite>Allison, Ian (20 January 2016). ["R3 completes trial of five cloud-based blockchain technologies at 40 banks"](http://www.ibtimes.co.uk/r3-completes-trial-five-cloud-based-blockchain-technologies-40-banks-1547260). _ [International Business Times](/wiki/International_Business_Times "International Business Times")_.</cite>

110. ** [^](#cite-ref-110)** Andrew Quentson (11 September 2016). [Swiss Industry Consortium to Use Ethereum's Blockchain](https://www.cryptocoinsnews.com/swiss-industry-consortium-use-ethereums-blockchain/). cryptocoins news. Retrieved 6 November 2016.

111. ** [^](#cite-ref-bi20161102-111-0)** <cite>["MasterCard pushes ahead into blockchain tech"](http://www.businessinsider.com/mastercard-pushes-ahead-into-blockchain-tech-2016-11). _Business Insider_. 2 November 2016 . Retrieved 2016-11-04.</cite>

112. ** [^](#cite-ref-112)** <cite>["World's Fastest Blockchain Tested in Australia"](https://cryptovest.com/news/worlds-fastest-blockchain-tested-in-australia-beats-visas-payment-system/).</cite>

113. ** [^](#cite-ref-113)** <cite>["Mastercard Seeks Patent for Instant Blockchain Payments Processing"](https://www.coindesk.com/mastercard-patent-filings-detail-blockchains-use-speeding-payments/).</cite>

114. ** [^](#cite-ref-114)** <cite>["Swift Blockchain Success Sets Stage for Sibos"](https://www.coindesk.com/unanimous-swift-blockchain-success-sets-stage-sibos/).</cite>

115. ** [^](#cite-ref-115)** <cite>["First cryptocurrency freight deal takes Russian wheat to Turkey"](https://www.bloomberg.com/news/articles/2018-01-23/first-cryptocurrency-freight-deal-takes-russian-wheat-to-turkey). _Bloomberg.com_. 23 January 2018 . Retrieved 2018-02-01.</cite>

116. ** [^](#cite-ref-fuusca-116-0)** <cite>Jean-Pierre Buntinx (4 August 2015). ["Future Use Cases for Blockchain Technology: Copyright Registration"](https://news.bitcoin.com/future-use-cases-for-blockchain-technology-copyright-registration/). _bitcoin.com_. Saint Bitts . Retrieved 5 November 2016.</cite>

117. ** [^](#cite-ref-117)** <cite>["Blockchain Could Be Music's Next Disruptor"](http://fortune.com/2016/09/22/blockchain-music-disruption/). 22 September 2016.</cite>

118. ** [^](#cite-ref-118)** <cite>["ASCAP, PRS and SACEM Join Forces for Blockchain Copyright System"](http://www.musicbusinessworldwide.com/ascap-prs-sacem-join-forces-blockchain-copyright-system/). Music Business Worldwide. 9 April 2017.</cite>

119. ** [^](#cite-ref-119)** <cite>Bartlett, Jamie (6 September 2015). ["Imogen Heap: saviour of the music industry?"](https://www.theguardian.com/music/2015/sep/06/imogen-heap-saviour-of-music-industry). _The Guardian_. Retrieved 18 June 2016.</cite>

120. ** [^](#cite-ref-wsj20160714-120-0)** <cite>Nash, Kim S. (14 July 2016). ["IBM Pushes Blockchain into the Supply Chain"](https://www.wsj.com/articles/ibm-pushes-blockchain-into-the-supply-chain-1468528824). _ [The Wall Street Journal](/wiki/The_Wall_Street_Journal "The Wall Street Journal")_. Retrieved 2016-07-24.</cite>

121. ** [^](#cite-ref-kodakcoin-121-0)** <cite>["Kodak annonce une ICO et le lancement du KodakCoin"](https://www.usine-digitale.fr/article/ces-2018-kodak-annonce-une-ico-et-le-lancement-du-kodakcoin.N636598). _ [CES 2018](/wiki/CES_2018 "CES 2018")_. 11 Jan 2018.</cite>

122. ** [^](#cite-ref-122)** <cite>Kastelein, Richard (24 August 2017). ["The World's First DJ Mix That Pays Artists in Seconds Using Blockchain Technology"](http://www.the-blockchain.com/2017/08/24/worlds-first-dj-mix-pays-artists-seconds-using-blockchain-technology/). _Blockchain News_. Retrieved 2017-09-03.</cite>

123. ** [^](#cite-ref-123)** K. Kotobi, and S. G. Bilen, ["Blockchain-enabled spectrum access in cognitive radio networks"](http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7943523), 2017 Wireless Telecommunications Symposium (WTS), 2017.

124. ** [^](#cite-ref-breac-124-0)** <cite>["Blockchain reaction: Tech companies plan for critical mass"](http://www.ey.com/Publication/vwLUAssets/ey-blockchain-reaction-tech-companies-plan-for-critical-mass/$FILE/ey-blockchain-reaction.pdf) (PDF). Ernst & Young. p. 5 . Retrieved 13 November 2016.</cite>

125. ** [^](#cite-ref-ovpfaq-125-0)** <cite>["Online Voting Platform FAQ's"](https://followmyvote.com/online-voting-platform-faqs/). _Follow My Vote_. Retrieved 7 December 2016.</cite>

126. ** [^](#cite-ref-126)** <cite>Chandra, Prabhul. ["Reimagining Democracy: What if votes were a crypto-currency?"](https://www.democracywithoutborders.org/de/4625/reimagining-democracy-what-if-votes-were-a-crypto-currency/). _democracywithoutborders.org_. Retrieved 2018-02-05.</cite>

127. ** [^](#cite-ref-bmbh-127-0)** <cite>Bryant, Meg (5 May 2016). ["Blockchain may be healthcare's answer to interoperability, data security"](http://www.healthcaredive.com/news/blockchain-may-be-healthcares-answer-to-interoperability-data-security/418708/). _Health Care Dive_. Industry Dive . Retrieved 4 December 2016.</cite>

128. ** [^](#cite-ref-128)** <cite>["CryptoKitties craze slows down transactions on Ethereum"](http://www.bbc.com/news/technology-42237162). 12 May 2017.</cite>

129. ** [^](#cite-ref-129)** <cite>["IBM Blockchain based on Hyperledger Fabric from the Linux Foundation"](https://www.ibm.com/blockchain/hyperledger.html). _www.ibm.com_. 2018-01-09 . Retrieved 2018-01-18.</cite>

130. ** [^](#cite-ref-130)** <cite>["Why J.P. Morgan Chase Is Building a Blockchain on Ethereum"](http://fortune.com/2016/10/04/jp-morgan-chase-blockchain-ethereum-quorum/). _Fortune_. Retrieved 2017-01-24.</cite>

131. ** [^](#cite-ref-131)** <cite>["Hyperledger blockchain code almost comes together for IoT"](http://rethink-iot.com/2016/04/01/hyperledger-blockchain-code-almost-comes-together-for-iot/). _rethink-iot.com_. 1 April 2016 . Retrieved 18 June 2016.</cite>

132. ** [^](#cite-ref-132)** <cite>Miller, Ron. ["IBM unveils Blockchain as a Service based on open source Hyperledger Fabric technology – TechCrunch"](https://techcrunch.com/2017/03/19/ibm-unveils-blockchain-as-a-service-based-on-open-source-hyperledger-fabric-technology/).</cite>

133. ** [^](#cite-ref-133)** <cite>["IBM Blockchain based on Hyperledger Fabric from the Linux Foundation"](https://www.ibm.com/blockchain/hyperledger.html). _ibm.com_. 25 August 2017 . Retrieved 2017-09-20.</cite>

134. ** [^](#cite-ref-134)** <cite>["Oracle Launches Enterprise-Grade Blockchain Cloud Service"](https://www.oracle.com/corporate/pressrelease/oow17-oracle-launches-blockchain-cloud-service-100217.html). _oracle.com_. Retrieved 2017-11-15.</cite>

135. ** [^](#cite-ref-135)** <cite>Jacobsen, Eric. ["Oracle Cements Interest on Blockchain: Joins Hyperledger"](https://blogs.oracle.com/cloud-platform/oracle-joins-hyperledger-consortium). Retrieved 2017-11-15.</cite>

136. ** [^](#cite-ref-136)** <cite>Friedlmaier, Maximilian; Tumasjan, Andranik; Welpe, Isabell (26 August 2016). ["Disrupting industries with blockchain: The industry, venture capital funding, and regional distribution of blockchain ventures"](https://poseidon01.ssrn.com/delivery.php?ID=342110087101019118108085090101111006002092063023032070066028019098080089119103014117121123020058055102054115079081088000013118049055017040015004071102104126069096101033093000102070112110089072005076102084087098005024098124007022103023126086003114124121&EXT=pdf). Retrieved 2016-11-29.</cite>

137. ** [^](#cite-ref-137)** <cite>Higgins, Stan (16 December 2016). ["ABN Amro Tests Blockchain for Real Estate Transactions"](http://www.coindesk.com/abn-amro-blockchain-real-estate/). _Coindesk.com_. Retrieved 2016-12-18.</cite>

138. ** [^](#cite-ref-138)** <cite>Catalini, Christian; Tucker, Catherine E. (11 August 2016). "Seeding the S-Curve? The Role of Early Adopters in Diffusion". [doi](/wiki/Digital_object_identifier "Digital object identifier"):[10.2139/ssrn.2822729](//doi.org/10.2139%2Fssrn.2822729). [SSRN](/wiki/Social_Science_Research_Network "Social Science Research Network") [2822729](//ssrn.com/abstract=2822729) ![Freely accessible](//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Lock-green.svg/9px-Lock-green.svg.png "Freely accessible").</cite>

139. ** [^](#cite-ref-extance2015-139-0)** <cite>Extance, Andy (30 September 2015). ["The future of cryptocurrencies: Bitcoin and beyond"](http://www.nature.com/news/the-future-of-cryptocurrencies-bitcoin-and-beyond-1.18447). _Nature_. **526** (7571): 21–23. [doi](/wiki/Digital_object_identifier "Digital object identifier"):[10.1038/526021a](//doi.org/10.1038%2F526021a) ![Freely accessible](//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Lock-green.svg/9px-Lock-green.svg.png "Freely accessible"). [ISSN](/wiki/International_Standard_Serial_Number "International Standard Serial Number") [0028-0836](//www.worldcat.org/issn/0028-0836). [OCLC](/wiki/OCLC "OCLC") [421716612](//www.worldcat.org/oclc/421716612).</cite>

140. ** [^](#cite-ref-castillo2016-140-0)** <cite>del Castillo, Michael (22 December 2016). ["Ledger Publishes First Volume of Peer-Reviewed Blockchain Research"](http://www.coindesk.com/ledger-first-volume-blockchain-research/). _CoinDesk_. [Archived](https://web.archive.org/web/20170110165805/http://www.coindesk.com/ledger-first-volume-blockchain-research/) from the original on 10 January 2017 . Retrieved 10 January 2017.</cite>

141. ** [^](#cite-ref-141)** <cite>["Ledger (eJournal / eMagazine, 2015)"](https://www.worldcat.org/title/ledger/oclc/910895894). _OCLC WorldCat_. OCLC. [Archived](https://web.archive.org/web/20170111113930/https://www.worldcat.org/title/ledger/oclc/910895894) from the original on 11 January 2017 . Retrieved 11 January 2017.</cite>

142. ** [^](#cite-ref-hertig2015-142-0)** <cite>Hertig, Alyssa (15 September 2015). ["Introducing Ledger, the First Bitcoin-Only Academic Journal"](http://motherboard.vice.com/read/introducing-ledger-the-first-bitcoin-only-academic-journal). _Motherboard_. [Archived](https://web.archive.org/web/20170110172807/http://motherboard.vice.com/read/introducing-ledger-the-first-bitcoin-only-academic-journal) from the original on 10 January 2017 . Retrieved 10 January 2017.</cite>

143. ** [^](#cite-ref-143)** <cite>Rizun, Peter R.; Wilmer, Christopher E.; Burley, Richard Ford; Miller, Andrew (2015). ["How to Write and Format an Article for Ledger"](http://ledger.pitt.edu/ojs/public/journals/1/AuthorGuide.pdf) (PDF). _Ledger_. **1** (1): 1–12. [doi](/wiki/Digital_object_identifier "Digital object identifier"):[10.5195/LEDGER.2015.1](//doi.org/10.5195%2FLEDGER.2015.1) (inactive 13 March 2017). [ISSN](/wiki/International_Standard_Serial_Number "International Standard Serial Number") [2379-5980](//www.worldcat.org/issn/2379-5980). [OCLC](/wiki/OCLC "OCLC") [910895894](//www.worldcat.org/oclc/910895894). Retrieved 11 January 2017.</cite>

144. ** [^](#cite-ref-144)** <cite>Marr, Bernard. ["How Blockchain Technology Could Change The World"](https://www.forbes.com/sites/bernardmarr/2016/05/27/how-blockchain-technology-could-change-the-world/). _Forbes_. Retrieved 2017-01-06.</cite>

145. ** [^](#cite-ref-145)** <cite>["Deep Shift: Technology Tipping Points and Societal Impact, Survey Report"](http://www3.weforum.org/docs/WEF_GAC15_Technological_Tipping_Points_report_2015.pdf#page=24) (PDF). [World Economic Forum](/wiki/World_Economic_Forum "World Economic Forum"). September 2015. p. 24 . Retrieved 7 November 2017.</cite>

## Further reading [[edit](/w/index.php?title=Blockchain&action=edit&section=27 "Edit section: Further reading")]

- <cite>Bashir, Imran (2017). _Mastering Blockchain_. Packt Publishing, Ltd. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-1-78712-544-5](/wiki/Special:BookSources/978-1-78712-544-5 "Special:BookSources/978-1-78712-544-5"). [OCLC](/wiki/OCLC "OCLC") [967373845](//www.worldcat.org/oclc/967373845).</cite>

- <cite>Crosby, Michael; Nachiappan; Pattanayak, Pradhan; Verma, Sanjeev; Kalyanaraman, Vignesh (16 October 2015). [BlockChain Technology: Beyond Bitcoin](http://scet.berkeley.edu/wp-content/uploads/BlockchainPaper.pdf) (PDF) (Report). Sutardja Center for Entrepreneurship & Technology Technical Report. University of California, Berkeley . Retrieved 2017-03-19.</cite>

- <cite>Higgins, Stan (3 March 2016). ["40 Banks Trial Commercial Paper Trading in Latest R3 Blockchain Test"](http://www.coindesk.com/r3-consortium-banks-blockchain-solutions/). _CoinDesk_. Retrieved 2016-03-21.</cite>

- <cite>Kakavand, Hossein; De Sevres, Nicolette Kost; Chilton, Bart (12 October 2016). The Blockchain Revolution: An Analysis of Regulation and Technology Related to Distributed Ledger Technologies (Report). Luther Systems & DLA Piper. [SSRN](/wiki/Social_Science_Research_Network "Social Science Research Network") [2849251](//ssrn.com/abstract=2849251) ![Freely accessible](//upload.wikimedia.org/wikipedia/commons/thumb/6/65/Lock-green.svg/9px-Lock-green.svg.png "Freely accessible").</cite>

- <cite>Mazonka, Oleg (29 December 2016). ["Blockchain: Simple Explanation"](http://jrxv.net/x/16/chain.pdf) (PDF). _Journal of Reference_.</cite>

- <cite>Saito, Kenji; Yamada, Hiroyuki (June 2016). [_What's So Different about Blockchain? Blockchain is a Probabilistic State Machine_](https://www.computer.org/csdl/proceedings/icdcsw/2016/3686/00/5878a168-abs.html). IEEE 36th International Conference on Distributed Computing Systems Workshops. Nara, Nara, Japan: IEEE. pp. 168–75. [doi](/wiki/Digital_object_identifier "Digital object identifier"):[10.1109/ICDCSW.2016.28](//doi.org/10.1109%2FICDCSW.2016.28). [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-1-5090-3686-8](/wiki/Special:BookSources/978-1-5090-3686-8 "Special:BookSources/978-1-5090-3686-8"). [ISSN](/wiki/International_Standard_Serial_Number "International Standard Serial Number") [2332-5666](//www.worldcat.org/issn/2332-5666). Retrieved 2017-02-15.</cite>

- <cite>Tapscott, Don; Tapscott, Alex (2016). [_Blockchain Revolution: How the Technology Behind Bitcoin Is Changing Money, Business and the World_](http://blockchain-revolution.com/). London: Portfolio Penguin. [ISBN](/wiki/International_Standard_Book_Number "International Standard Book Number") [978-0-241-23785-4](/wiki/Special:BookSources/978-0-241-23785-4 "Special:BookSources/978-0-241-23785-4"). [OCLC](/wiki/OCLC "OCLC") [971395169](//www.worldcat.org/oclc/971395169).</cite>

- <cite>Raval, Siraj (2016). [_Decentralized Applications: Harnessing Bitcoin's Blockchain Technology_](http://shop.oreilly.com/product/0636920039334.do?sortby=publicationDate). Oreilly.</cite>

- <cite>Santiago, Ismael (2017). [_La Revolución de la tecnología de Cadenas de Bloques en la economía_](https://www.amazon.es/Revoluci%C3%B3n-tecnolog%C3%ADa-Cadenas-Bloques-econom%C3%ADa/dp/3639536878/ref=sr_1_sc_1?ie=UTF8&qid=1498553601&sr=8-1-spell&keywords=ismae+santiago+moreno). EAE.</cite>

## External links [[edit](/w/index.php?title=Blockchain&action=edit&section=28 "Edit section: External links")]

| ![](//upload.wikimedia.org/wikipedia/commons/thumb/9/91/Wikiversity-logo.svg/40px-Wikiversity-logo.svg.png) | Wikiversity has learning resources about _** [Blockchain](https://en.wikiversity.org/wiki/Blockchain "v:Blockchain")**_ |

 Media related to [Blockchain](https://commons.wikimedia.org/wiki/Category:Blockchain "commons:Category:Blockchain") at Wikimedia Commons

- <cite>["Patent Landscape Report on Blockchain by PatSeer Pro"](https://patseer.com/2017/03/patent-landscape-report-on-blockchain-by-patseer-pro/). _PatSeer_. Retrieved 2017-11-03.</cite>

- [<abbr title="View this template">v</abbr>](/wiki/Template:Cryptocurrencies "Template:Cryptocurrencies")
- [<abbr title="Discuss this template">t</abbr>](/wiki/Template_talk:Cryptocurrencies "Template talk:Cryptocurrencies")
- [<abbr title="Edit this template">e</abbr>](//en.wikipedia.org/w/index.php?title=Template:Cryptocurrencies&action=edit) [Cryptocurrencies](/wiki/Cryptocurrency "Cryptocurrency") |
| --- |
| [SHA-256](/wiki/SHA-2 "SHA-2")-based |
- [Bitcoin](/wiki/Bitcoin "Bitcoin")
- [Bitcoin Cash](/wiki/Bitcoin_Cash "Bitcoin Cash")
- [Factom](/wiki/Factom "Factom")
- [Namecoin](/wiki/Namecoin "Namecoin")
- [NuBits](/wiki/NuBits "NuBits")
- [Peercoin](/wiki/Peercoin "Peercoin")
- [Titcoin](/wiki/Titcoin "Titcoin") |
| [Ethash](/wiki/Ethash "Ethash")-based |
- [Ethereum](/wiki/Ethereum "Ethereum")
- [Ethereum Classic](/wiki/Ethereum_Classic "Ethereum Classic")
- [KodakCoin](/wiki/KodakCoin "KodakCoin")
- [Ubiq](/wiki/Ubiq "Ubiq") |
| [Scrypt](/wiki/Scrypt "Scrypt")-based |
- [Litecoin](/wiki/Litecoin "Litecoin")
- [Auroracoin](/wiki/Auroracoin "Auroracoin")
- [Dogecoin](/wiki/Dogecoin "Dogecoin")
- [PotCoin](/wiki/PotCoin "PotCoin") |
| [Equihash](/wiki/Equihash "Equihash")-based |
- [Zcash](/wiki/Zcash "Zcash")
- [Zcoin](/wiki/Zerocoin#Zcoin_(XZC) "Zerocoin")
- [Zclassic](/wiki/Zclassic "Zclassic")
- [Bitcoin Gold](/wiki/Bitcoin_Gold "Bitcoin Gold")
- [Komodo](/wiki/Komodo_(cryptocurrency) "Komodo (cryptocurrency)") |
| [CryptoNote](/wiki/CryptoNote "CryptoNote")-based |
- [Bytecoin](/wiki/CryptoNote#Bytecoin_.28BCN.29 "CryptoNote")
- [Monero](/wiki/Monero_(cryptocurrency) "Monero (cryptocurrency)") |
| Other [proof-of-work](/wiki/Proof-of-work_system "Proof-of-work system") |
- [Dash](/wiki/Dash_(cryptocurrency) "Dash (cryptocurrency)")
- [Decred](/wiki/Decred "Decred")
- [DigiByte](/wiki/DigiByte "DigiByte")
- [IOTA](/wiki/IOTA_(technology) "IOTA (technology)")
- [Myriadcoin](/wiki/Myriadcoin "Myriadcoin")
- [Primecoin](/wiki/Primecoin "Primecoin")
- [Sia](/wiki/Sia_(technology) "Sia (technology)") |
| Non [proof-of-work](/wiki/Proof-of-work_system "Proof-of-work system") |
- [Ardor](/wiki/ARDOR "ARDOR")
- [BitShares](/wiki/BitShares "BitShares")
- [BlackCoin](/wiki/BlackCoin "BlackCoin")
- [Burstcoin](/wiki/Burstcoin "Burstcoin")
- [Cardano](/wiki/Cardano_(cryptocurrency) "Cardano (cryptocurrency)")
- [Counterparty](/wiki/Counterparty_(technology) "Counterparty (technology)")
- [EOS](/wiki/EOS_(cryptocurrency) "EOS (cryptocurrency)")
- [FunFair](/wiki/FunFair "FunFair")
- [Gridcoin](/wiki/Gridcoin "Gridcoin")
- [Lisk](/wiki/Lisk "Lisk")
- [NEM](/wiki/NEM_(cryptocurrency) "NEM (cryptocurrency)")
- [NEO](/wiki/NEO_(cryptocurrency) "NEO (cryptocurrency)")
- [Nxt](/wiki/Nxt "Nxt")
- [OmiseGO](/wiki/OmiseGO "OmiseGO")
- [Qtum](/wiki/Qtum "Qtum")
- [RChain](/wiki/RChain "RChain")
- [Ripple](/wiki/Ripple_(payment_protocol) "Ripple (payment protocol)")
- [Simple Token](/wiki/Simple_Token "Simple Token")
- [Sirin Labs](/wiki/Sirin_Labs "Sirin Labs")
- [Stellar](/wiki/Stellar_(payment_network) "Stellar (payment network)")
- [Steem](/wiki/Steemit#Steem_blockchain "Steemit")
- [Tether](/wiki/Tether_(cryptocurrency) "Tether (cryptocurrency)")
- [Waves](/wiki/Waves_platform "Waves platform") |
| [Consensus](/wiki/Consensus_(computer_science) "Consensus (computer science)")mechanisms |
- [Proof-of-authority](/wiki/Proof-of-authority "Proof-of-authority")
- [Proof-of-space](/wiki/Proof-of-space "Proof-of-space")
- [Proof-of-stake](/wiki/Proof-of-stake "Proof-of-stake")
- [Proof-of-work system](/wiki/Proof-of-work_system "Proof-of-work system") |
| Technology |
- [Atomic swap](/wiki/Atomic_swap "Atomic swap")
*
- [Cryptocurrency tumbler](/wiki/Cryptocurrency_tumbler "Cryptocurrency tumbler")
- [Distributed ledger](/wiki/Distributed_ledger "Distributed ledger")
- [Cryptographic hash function](/wiki/Cryptographic_hash_function "Cryptographic hash function")
- [Fork](/wiki/Fork_(blockchain) "Fork (blockchain)")
- [Lightning Network](/wiki/Lightning_Network "Lightning Network") |
| Related topics |
- [Anonymous Internet banking](/wiki/Anonymous_Internet_banking "Anonymous Internet banking")
- [Bitcoin network](/wiki/Bitcoin_network "Bitcoin network")
- [Complementary currency](/wiki/Complementary_currency "Complementary currency")
- [Crypto-anarchism](/wiki/Crypto-anarchism "Crypto-anarchism")
- [Cryptocurrency exchange](/wiki/Cryptocurrency_exchange "Cryptocurrency exchange")
- [Digital currency](/wiki/Digital_currency "Digital currency")
- [Double-spending](/wiki/Double-spending "Double-spending")
- [Electronic money](/wiki/Digital_currency "Digital currency")
- [Initial coin offering](/wiki/Initial_coin_offering "Initial coin offering")
- [Airdrop](/wiki/Airdrop_(cryptocurrency) "Airdrop (cryptocurrency)")
- [Virtual currency](/wiki/Virtual_currency "Virtual currency") |

- ![Category](//upload.wikimedia.org/wikipedia/en/thumb/4/48/Folder_Hexagonal_Icon.svg/16px-Folder_Hexagonal_Icon.svg.png "Category")** [Category](/wiki/Category:Cryptocurrencies "Category:Cryptocurrencies")**
- ![Commons page](//upload.wikimedia.org/wikipedia/en/thumb/4/4a/Commons-logo.svg/12px-Commons-logo.svg.png "Commons page")** [Commons](https://commons.wikimedia.org/wiki/Category:Cryptocurrency "commons:Category:Cryptocurrency")**
- ![List-Class article](//upload.wikimedia.org/wikipedia/en/thumb/d/db/Symbol_list_class.svg/16px-Symbol_list_class.svg.png "List-Class article")** [List](/wiki/List_of_cryptocurrencies "List of cryptocurrencies")** |

- [<abbr title="View this template">v</abbr>](/wiki/Template:Bitcoin "Template:Bitcoin")
- [<abbr title="Discuss this template">t</abbr>](/wiki/Template_talk:Bitcoin "Template talk:Bitcoin")
- [<abbr title="Edit this template">e</abbr>](//en.wikipedia.org/w/index.php?title=Template:Bitcoin&action=edit) [Bitcoin](/wiki/Bitcoin "Bitcoin")(₿) |
| --- |

- [History](/wiki/History_of_bitcoin "History of bitcoin")
- [Economics](/wiki/Economics_of_bitcoin "Economics of bitcoin")
- [Legal status](/wiki/Legality_of_bitcoin_by_country_or_territory "Legality of bitcoin by country or territory") |
| People |
- [Gavin Andresen](/wiki/Gavin_Andresen "Gavin Andresen")
- [Andreas Antonopoulos](/wiki/Andreas_Antonopoulos "Andreas Antonopoulos")
- [Adam Back](/wiki/Adam_Back "Adam Back")
- [Wences Casares](/wiki/Wences_Casares "Wences Casares")
- [Hal Finney](/wiki/Hal_Finney_(computer_scientist) "Hal Finney (computer scientist)")
- [Satoshi Nakamoto](/wiki/Satoshi_Nakamoto "Satoshi Nakamoto")
- [Charlie Shrem](/wiki/Charlie_Shrem "Charlie Shrem")
- [Nick Szabo](/wiki/Nick_Szabo "Nick Szabo")
- [Amir Taaki](/wiki/Amir_Taaki "Amir Taaki")
- [Ross Ulbricht](/wiki/Ross_Ulbricht "Ross Ulbricht")
- [Roger Ver](/wiki/Roger_Ver "Roger Ver")
- [Winklevoss twins](/wiki/Winklevoss_twins "Winklevoss twins")
- [Erik Voorhees](/wiki/Erik_Voorhees "Erik Voorhees")
- [Marc Andreessen](/wiki/Marc_Andreessen "Marc Andreessen")
- [Mark Karpelès](/wiki/Mark_Karpel%C3%A8s "Mark Karpelès")
- [Vitalik Buterin](/wiki/Vitalik_Buterin "Vitalik Buterin")
- [Tim Draper](/wiki/Tim_Draper "Tim Draper")
- [Patrick Byrne](/wiki/Patrick_M._Byrne "Patrick M. Byrne") |
| Groups |
- [List of bitcoin companies](/wiki/List_of_bitcoin_companies "List of bitcoin companies")
- [List of bitcoin organizations](/wiki/List_of_bitcoin_organizations "List of bitcoin organizations")
- [List of people in blockchain technology](/wiki/List_of_people_in_blockchain_technology "List of people in blockchain technology") |
| Technologies |
- [Bitcoin network](/wiki/Bitcoin_network "Bitcoin network")
*
- [Colored coins](/wiki/Colored_coins "Colored coins")
- [Cryptocurrency](/wiki/Cryptocurrency "Cryptocurrency")
- [Cryptocurrency tumbler](/wiki/Cryptocurrency_tumbler "Cryptocurrency tumbler")
- [Bitcoin ATM](/wiki/Bitcoin_ATM "Bitcoin ATM")
- [ECDSA](/wiki/Elliptic_Curve_Digital_Signature_Algorithm "Elliptic Curve Digital Signature Algorithm")
- [Initial coin offering](/wiki/Initial_coin_offering "Initial coin offering")
- [Lightning Network](/wiki/Lightning_Network "Lightning Network")
- [P2P](/wiki/Peer-to-peer "Peer-to-peer")
- [POW](/wiki/Proof-of-work_system "Proof-of-work system")
- [Segregated Witness](/wiki/SegWit "SegWit")
- [SHA-2](/wiki/SHA-2 "SHA-2")
- [CoinJoin](/wiki/CoinJoin "CoinJoin") |
| Software clients |
- [Bitcoin Core](/wiki/Bitcoin_Core "Bitcoin Core")
- [Bitcoin Unlimited](/wiki/Bitcoin_Unlimited "Bitcoin Unlimited")
- [Bitcoin Classic](/wiki/Bitcoin_Classic "Bitcoin Classic")
- [Bitcoin XT](/wiki/Bitcoin_XT "Bitcoin XT") |
| Exchanges |
- [ANX](/wiki/ANX_(Hong_Kong_company) "ANX (Hong Kong company)")
- [Bitcoin Center NYC](/wiki/Bitcoin_Center_NYC "Bitcoin Center NYC")
- [Bitfinex](/wiki/Bitfinex "Bitfinex")
- [Bitstamp](/wiki/Bitstamp "Bitstamp")
- [BTCC](/wiki/BTCC_(bitcoin_company) "BTCC (bitcoin company)")
- [BTC Markets](/wiki/BTC_Markets "BTC Markets")
- [CEX.IO](/wiki/CEX.IO_Bitcoin_Exchange "CEX.IO Bitcoin Exchange")
- [Coinbase (GDAX)](/wiki/Coinbase "Coinbase")
- [Coinfloor](/wiki/Coinfloor "Coinfloor")
- [Coins.ph](/wiki/Coins.ph "Coins.ph")
- [Gatecoin](/wiki/Gatecoin "Gatecoin")
- [Gemini](/wiki/Gemini_(digital_currency_exchange) "Gemini (digital currency exchange)")
- [Huobi](/wiki/Huobi "Huobi")
- [Kraken](/wiki/Kraken_(bitcoin_exchange) "Kraken (bitcoin exchange)")
- [LocalBitcoins](/wiki/LocalBitcoins "LocalBitcoins")
- [QuadrigaCX](/wiki/QuadrigaCX "QuadrigaCX")

| Defunct |
- [Buttercoin](/wiki/Buttercoin "Buttercoin")
- [Mt. Gox](/wiki/Mt._Gox "Mt. Gox")
- [BitInstant](/wiki/BitInstant "BitInstant")
- [BTC-e](/wiki/BTC-e "BTC-e")
- [OKCoin](/wiki/OKCoin "OKCoin") |  |

- ![Wikipedia book](//upload.wikimedia.org/wikipedia/commons/thumb/8/89/Symbol_book_class2.svg/16px-Symbol_book_class2.svg.png "Wikipedia book")** [Book](/wiki/Book:Bitcoin "Book:Bitcoin")**
- ![Category](//upload.wikimedia.org/wikipedia/en/thumb/4/48/Folder_Hexagonal_Icon.svg/16px-Folder_Hexagonal_Icon.svg.png "Category")** [Category](/wiki/Category:Bitcoin "Category:Bitcoin")** |

- [<abbr title="View this template">v</abbr>](/wiki/Template:Databases "Template:Databases")
- [<abbr title="Discuss this template">t</abbr>](/wiki/Template_talk:Databases "Template talk:Databases")
- [<abbr title="Edit this template">e</abbr>](//en.wikipedia.org/w/index.php?title=Template:Databases&action=edit) [Database management systems](/wiki/Database "Database") |
| --- |
| Types |
- [Object-oriented](/wiki/Object_database "Object database")
  * [comparison](/wiki/Comparison_of_object_database_management_systems "Comparison of object database management systems")
- [Relational](/wiki/List_of_relational_database_management_systems "List of relational database management systems")
  * [comparison](/wiki/Comparison_of_relational_database_management_systems "Comparison of relational database management systems")
- [Document-oriented](/wiki/Document-oriented_database "Document-oriented database")
- [Graph](/wiki/Graph_database "Graph database")
- [NoSQL](/wiki/NoSQL "NoSQL")
- [NewSQL](/wiki/NewSQL "NewSQL") |
| Concepts |
- [Database](/wiki/Database "Database")
- [ACID](/wiki/ACID "ACID")
- [Armstrong's axioms](/wiki/Armstrong%27s_axioms "Armstrong's axioms")
- [CAP theorem](/wiki/CAP_theorem "CAP theorem")
- [CRUD](/wiki/Create,_read,_update_and_delete "Create, read, update and delete")
- [Null](/wiki/Null_(SQL) "Null (SQL)")
- [Candidate key](/wiki/Candidate_key "Candidate key")
- [Foreign key](/wiki/Foreign_key "Foreign key")
- [Superkey](/wiki/Superkey "Superkey")
- [Surrogate key](/wiki/Surrogate_key "Surrogate key")
- [Unique key](/wiki/Unique_key "Unique key") |
| Objects |
- [Relation](/wiki/Relation_(database) "Relation (database)")
  * [table](/wiki/Table_(database) "Table (database)")
  * [column](/wiki/Column_(database) "Column (database)")
  * [row](/wiki/Row_(database) "Row (database)")
- [View](/wiki/View_(SQL) "View (SQL)")
- [Transaction](/wiki/Database_transaction "Database transaction")
- [Transaction log](/wiki/Transaction_log "Transaction log")
- [Trigger](/wiki/Database_trigger "Database trigger")
- [Index](/wiki/Database_index "Database index")
- [Stored procedure](/wiki/Stored_procedure "Stored procedure")
- [Cursor](/wiki/Cursor_(databases) "Cursor (databases)")
- [Partition](/wiki/Partition_(database) "Partition (database)") |
| Components |
- [Concurrency control](/wiki/Concurrency_control "Concurrency control")
- [Data dictionary](/wiki/Data_dictionary "Data dictionary")
- [JDBC](/wiki/Java_Database_Connectivity "Java Database Connectivity")
- [XQJ](/wiki/XQuery_API_for_Java "XQuery API for Java")
- [ODBC](/wiki/Open_Database_Connectivity "Open Database Connectivity")
- [Query language](/wiki/Query_language "Query language")
- [Query optimizer](/wiki/Query_optimization "Query optimization")
- [Query plan](/wiki/Query_plan "Query plan") |
| Functions |
- [Administration and automation](/wiki/Database_administration_and_automation "Database administration and automation")
- [Query optimization](/wiki/Query_optimization "Query optimization")
- [Replication](/wiki/Replication_(computing)#DATABASE "Replication (computing)") |
| Related topics |
- [Database models](/wiki/Database_model "Database model")
- [Database normalization](/wiki/Database_normalization "Database normalization")
- [Database storage](/wiki/Database_storage_structures "Database storage structures")
- [Distributed database](/wiki/Distributed_database "Distributed database")
- [Federated database system](/wiki/Federated_database_system "Federated database system")
- [Referential integrity](/wiki/Referential_integrity "Referential integrity")
- [Relational algebra](/wiki/Relational_algebra "Relational algebra")
- [Relational calculus](/wiki/Relational_calculus "Relational calculus")
- [Relational database](/wiki/Relational_database "Relational database")
- [Relational DBMS](/wiki/Relational_database_management_system "Relational database management system")
- [Relational model](/wiki/Relational_model "Relational model")
- [Object-relational database](/wiki/Object-relational_database "Object-relational database")
- [Transaction processing](/wiki/Transaction_processing "Transaction processing") |

- [<abbr title="View this template">v</abbr>](/wiki/Template:Semantic_Web "Template:Semantic Web")
- [<abbr title="Discuss this template">t</abbr>](/wiki/Template_talk:Semantic_Web "Template talk:Semantic Web")
- [<abbr title="Edit this template">e</abbr>](//en.wikipedia.org/w/index.php?title=Template:Semantic_Web&action=edit) [Semantic Web](/wiki/Semantic_Web "Semantic Web") |
| --- |
| Background |
- [Databases](/wiki/Database "Database")
- [Hypertext](/wiki/Hypertext "Hypertext")
- [Internet](/wiki/Internet "Internet")
- [Ontologies](/wiki/Ontology_(information_science) "Ontology (information science)")
- [Semantic networks](/wiki/Semantic_network "Semantic network")
- [World Wide Web](/wiki/World_Wide_Web "World Wide Web") |
| Sub-topics |
- [Data Web](/wiki/Data_Web "Data Web")
- [Dataspaces](/wiki/Dataspaces "Dataspaces")
- [Hyperdata](/wiki/Hyperdata "Hyperdata")
- [Linked data](/wiki/Linked_data "Linked data")
- [Rule-based systems](/wiki/Rule-based_system "Rule-based system") |
| Applications |
- [Semantic analytics](/wiki/Semantic_analytics "Semantic analytics")
- [Semantic broker](/wiki/Semantic_broker "Semantic broker")
- [Semantic computing](/wiki/Semantic_computing "Semantic computing")
- [Semantic mapper](/wiki/Semantic_mapper "Semantic mapper")
- [Semantic matching](/wiki/Semantic_matching "Semantic matching")
- [Semantic publishing](/wiki/Semantic_publishing "Semantic publishing")
- [Semantic reasoner](/wiki/Semantic_reasoner "Semantic reasoner")
- [Semantic search](/wiki/Semantic_search "Semantic search")
- [Semantic service-oriented architecture](/wiki/Semantic_service-oriented_architecture "Semantic service-oriented architecture")
- [Semantic wiki](/wiki/Semantic_wiki "Semantic wiki") |
| Related topics |
- [Collective intelligence](/wiki/Collective_intelligence "Collective intelligence")
- [Description logic](/wiki/Description_logic "Description logic")
- [Folksonomy](/wiki/Folksonomy "Folksonomy")
- [Geotagging](/wiki/Geotagging "Geotagging")
- [Information architecture](/wiki/Information_architecture "Information architecture")
- [Knowledge extraction](/wiki/Knowledge_extraction "Knowledge extraction")
- [Knowledge management](/wiki/Knowledge_management "Knowledge management")
- [Knowledge representation and reasoning](/wiki/Knowledge_representation_and_reasoning "Knowledge representation and reasoning")
- [Library 2.0](/wiki/Library_2.0 "Library 2.0")
- [Metadata](/wiki/Metadata "Metadata")
- [Mind mapping](/wiki/Mind_map "Mind map")
- [ODBC](/wiki/Open_Database_Connectivity "Open Database Connectivity")
- [References](/wiki/Reference_(computer_science) "Reference (computer science)")
- [Topic map](/wiki/Topic_map "Topic map")
- [Web 2.0](/wiki/Web_2.0 "Web 2.0")
- [Web engineering](/wiki/Web_engineering "Web engineering")
- [Web Science Trust](/wiki/Web_Science_Trust "Web Science Trust") |
| Standards |

| Syntax and supporting technologies |
- [HTTP](/wiki/Hypertext_Transfer_Protocol "Hypertext Transfer Protocol")
- [IRI](/wiki/Internationalized_Resource_Identifier "Internationalized Resource Identifier")
  * <small>[URI](/wiki/Uniform_Resource_Identifier "Uniform Resource Identifier")</small>
- [RDF](/wiki/Resource_Description_Framework "Resource Description Framework")
  * <small>[triples](/wiki/Semantic_triple "Semantic triple")</small>
  * <small>[RDF/XML](/wiki/RDF/XML "RDF/XML")</small>
  * <small>[JSON-LD](/wiki/JSON-LD "JSON-LD")</small>
  * <small>[Turtle](/wiki/Turtle_(syntax) "Turtle (syntax)")</small>
  * <small>[TriG](/wiki/TriG_(syntax) "TriG (syntax)")</small>
  * <small>[Notation3](/wiki/Notation3 "Notation3")</small>
  * <small>[N-Triples](/wiki/N-Triples "N-Triples")</small>
  * <small>[TriX](/wiki/TriX_(serialization_format) "TriX (serialization format)")(no W3C standard)</small>
- [RRID](/wiki/Research_resource_identifier "Research resource identifier")
- [SPARQL](/wiki/SPARQL "SPARQL")
- [XML](/wiki/XML "XML") |
| --- |
| Schemas, ontologies and rules |
- [Common Logic](/wiki/Common_Logic "Common Logic")
- [OWL](/wiki/Web_Ontology_Language "Web Ontology Language")
- [RDFS](/wiki/RDF_Schema "RDF Schema")
- [Rule Interchange Format](/wiki/Rule_Interchange_Format "Rule Interchange Format")
- [Semantic Web Rule Language](/wiki/Semantic_Web_Rule_Language "Semantic Web Rule Language")
- [ALPS](/wiki/Application-Level_Profile_Semantics_(ALPS) "Application-Level Profile Semantics (ALPS)") |
| Semantic annotation |
- [eRDF](/wiki/Embedded_RDF "Embedded RDF")
- [GRDDL](/wiki/GRDDL "GRDDL")
- [Microdata](/wiki/Microdata_(HTML) "Microdata (HTML)")
- [Microformats](/wiki/Microformat "Microformat")
- [RDFa](/wiki/RDFa "RDFa")
- [SAWSDL](/wiki/SAWSDL "SAWSDL")
- [Facebook Platform](/wiki/Facebook_Platform "Facebook Platform") |
| Common vocabularies |
- [DOAP](/wiki/DOAP "DOAP")
- [Dublin Core](/wiki/Dublin_Core "Dublin Core")
- [FOAF](/wiki/FOAF_(ontology) "FOAF (ontology)")
- [Schema.org](/wiki/Schema.org "Schema.org")
- [SIOC](/wiki/Semantically-Interlinked_Online_Communities "Semantically-Interlinked Online Communities")
- [SKOS](/wiki/Simple_Knowledge_Organization_System "Simple Knowledge Organization System") |
| Microformat vocabularies |
- [hAtom](/wiki/HAtom "HAtom")
- [hCalendar](/wiki/HCalendar "HCalendar")
- [hCard](/wiki/HCard "HCard")
- [hProduct](/wiki/HProduct "HProduct")
- [hRecipe](/wiki/HRecipe "HRecipe")
- [hResume](/wiki/HResume "HResume")
- [hReview](/wiki/HReview "HReview") |  |

Retrieved from "[https://en.wikipedia.org/w/index.php?title=Blockchain&oldid=824782862](https://en.wikipedia.org/w/index.php?title=Blockchain&oldid=824782862)" [Categories](/wiki/Help:Category "Help:Category"):

- [Database management systems](/wiki/Category:Database_management_systems "Category:Database management systems")
- [Bitcoin](/wiki/Category:Bitcoin "Category:Bitcoin")
- [Blockchains](/wiki/Category:Blockchains "Category:Blockchains")
- [Cryptocurrencies](/wiki/Category:Cryptocurrencies "Category:Cryptocurrencies")
- [Database models](/wiki/Category:Database_models "Category:Database models")
- [Emerging technologies](/wiki/Category:Emerging_technologies "Category:Emerging technologies")
- [Computer-related introductions in 2009](/wiki/Category:Computer-related_introductions_in_2009 "Category:Computer-related introductions in 2009")
- [Information systems](/wiki/Category:Information_systems "Category:Information systems")
- [Writing systems](/wiki/Category:Writing_systems "Category:Writing systems")
- [Mathematical tools](/wiki/Category:Mathematical_tools "Category:Mathematical tools")
- [Counting instruments](/wiki/Category:Counting_instruments "Category:Counting instruments")
- [Encodings](/wiki/Category:Encodings "Category:Encodings")
- [Decentralization](/wiki/Category:Decentralization "Category:Decentralization")

Hidden categories:

- [CS1 Russian-language sources (ru)](/wiki/Category:CS1_Russian-language_sources_(ru) "Category:CS1 Russian-language sources (ru)")
- [Pages with DOIs inactive since 2017](/wiki/Category:Pages_with_DOIs_inactive_since_2017 "Category:Pages with DOIs inactive since 2017")
- [Use dmy dates from December 2017](/wiki/Category:Use_dmy_dates_from_December_2017 "Category:Use dmy dates from December 2017")
- [All articles with unsourced statements](/wiki/Category:All_articles_with_unsourced_statements "Category:All articles with unsourced statements")
- [Articles with unsourced statements from February 2018](/wiki/Category:Articles_with_unsourced_statements_from_February_2018 "Category:Articles with unsourced statements from February 2018")
- [All articles with failed verification](/wiki/Category:All_articles_with_failed_verification "Category:All articles with failed verification")
- [Articles with failed verification from February 2018](/wiki/Category:Articles_with_failed_verification_from_February_2018 "Category:Articles with failed verification from February 2018")
- [Articles containing potentially dated statements from 2016](/wiki/Category:Articles_containing_potentially_dated_statements_from_2016 "Category:Articles containing potentially dated statements from 2016")
- [All articles containing potentially dated statements](/wiki/Category:All_articles_containing_potentially_dated_statements "Category:All articles containing potentially dated statements")
- [Articles containing potentially dated statements from January 2018](/wiki/Category:Articles_containing_potentially_dated_statements_from_January_2018 "Category:Articles containing potentially dated statements from January 2018")
- [All articles lacking reliable references](/wiki/Category:All_articles_lacking_reliable_references "Category:All articles lacking reliable references")
- [Articles lacking reliable references from September 2017](/wiki/Category:Articles_lacking_reliable_references_from_September_2017 "Category:Articles lacking reliable references from September 2017")
- [Articles with unsourced statements from October 2016](/wiki/Category:Articles_with_unsourced_statements_from_October_2016 "Category:Articles with unsourced statements from October 2016")
- [All pages needing factual verification](/wiki/Category:All_pages_needing_factual_verification "Category:All pages needing factual verification")
- [Wikipedia articles needing factual verification from November 2015](/wiki/Category:Wikipedia_articles_needing_factual_verification_from_November_2015 "Category:Wikipedia articles needing factual verification from November 2015")

## Navigation menu

### Personal tools

- Not logged in
- [Talk](/wiki/Special:MyTalk "Discussion about edits from this IP address [n]")
- [Contributions](/wiki/Special:MyContributions "A list of edits made from this IP address [y]")
- [Create account](/w/index.php?title=Special:CreateAccount&returnto=Blockchain "You are encouraged to create an account and log in; however, it is not mandatory")
- [Log in](/w/index.php?title=Special:UserLogin&returnto=Blockchain "You're encouraged to log in; however, it's not mandatory. [o]")

### Namespaces

- [Article](/wiki/Blockchain "View the content page [c]")
- [Talk](/wiki/Talk:Blockchain "Discussion about the content page [t]")

### Variants

### Views

- [Read](/wiki/Blockchain)
- [Edit](/w/index.php?title=Blockchain&action=edit "Edit this page [e]")
- [View history](/w/index.php?title=Blockchain&action=history "Past revisions of this page [h]")

### More

### Search

### Navigation

- [Main page](/wiki/Main_Page "Visit the main page [z]")
- [Contents](/wiki/Portal:Contents "Guides to browsing Wikipedia")
- [Featured content](/wiki/Portal:Featured_content "Featured content – the best of Wikipedia")
- [Current events](/wiki/Portal:Current_events "Find background information on current events")
- [Random article](/wiki/Special:Random "Load a random article [x]")
- [Donate to Wikipedia](https://donate.wikimedia.org/wiki/Special:FundraiserRedirector?utm_source=donate&utm_medium=sidebar&utm_campaign=C13_en.wikipedia.org&uselang=en "Support us")
- [Wikipedia store](//shop.wikimedia.org "Visit the Wikipedia store")

### Interaction

- [Help](/wiki/Help:Contents "Guidance on how to use and edit Wikipedia")
- [About Wikipedia](/wiki/Wikipedia:About "Find out about Wikipedia")
- [Community portal](/wiki/Wikipedia:Community_portal "About the project, what you can do, where to find things")
- [Recent changes](/wiki/Special:RecentChanges "A list of recent changes in the wiki [r]")
- [Contact page](//en.wikipedia.org/wiki/Wikipedia:Contact_us "How to contact Wikipedia")

### Tools

- [What links here](/wiki/Special:WhatLinksHere/Blockchain "List of all English Wikipedia pages containing links to this page [j]")
- [Related changes](/wiki/Special:RecentChangesLinked/Blockchain "Recent changes in pages linked from this page [k]")
- [Upload file](/wiki/Wikipedia:File_Upload_Wizard "Upload files [u]")
- [Special pages](/wiki/Special:SpecialPages "A list of all special pages [q]")
- [Permanent link](/w/index.php?title=Blockchain&oldid=824782862 "Permanent link to this revision of the page")
- [Page information](/w/index.php?title=Blockchain&action=info "More information about this page")
- [Wikidata item](https://www.wikidata.org/wiki/Special:EntityPage/Q20514253 "Link to connected data repository item [g]")
- [Cite this page](/w/index.php?title=Special:CiteThisPage&page=Blockchain&id=824782862 "Information on how to cite this page")

### Print/export

- [Create a book](/w/index.php?title=Special:Book&bookcmd=book_creator&referer=Blockchain)
- [Download as PDF](/w/index.php?title=Special:ElectronPdf&page=Blockchain&action=show-download-screen)
- [Printable version](/w/index.php?title=Blockchain&printable=yes "Printable version of this page [p]")

### In other projects

- [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Blockchain)

### Languages

- [Afrikaans](https://af.wikipedia.org/wiki/Blokketting "Blokketting – Afrikaans")
- [العربية](https://ar.wikipedia.org/wiki/%D8%B3%D9%84%D8%B3%D9%84%D8%A9_%D8%A7%D9%84%D9%83%D8%AA%D9%84 "سلسلة الكتل – Arabic")
- [Azərbaycanca](https://az.wikipedia.org/wiki/Blok%C3%A7eyn "Blokçeyn – Azerbaijani")
- [Bân-lâm-gú](https://zh-min-nan.wikipedia.org/wiki/Blockchain "Blockchain – Chinese (Min Nan)")
- [Беларуская](https://be.wikipedia.org/wiki/%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D1%8D%D0%B9%D0%BD "Блокчэйн – Belarusian")
- [Беларуская (тарашкевіца)‎](https://be-x-old.wikipedia.org/wiki/%D0%91%D0%BB%D1%91%D0%BA%D1%87%D1%8D%D0%B9%D0%BD "Блёкчэйн – Belarusian (Taraškievica orthography)")
- [Български](https://bg.wikipedia.org/wiki/%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD "Блокчейн – Bulgarian")
- [Boarisch](https://bar.wikipedia.org/wiki/Blockchain "Blockchain – Bavarian")
- [Català](https://ca.wikipedia.org/wiki/Blockchain "Blockchain – Catalan")
- [Чӑвашла](https://cv.wikipedia.org/wiki/%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD "Блокчейн – Chuvash")
- [Čeština](https://cs.wikipedia.org/wiki/Blockchain "Blockchain – Czech")
- [Dansk](https://da.wikipedia.org/wiki/Blockchain "Blockchain – Danish")
- [Deutsch](https://de.wikipedia.org/wiki/Blockchain "Blockchain – German")
- [Eesti](https://et.wikipedia.org/wiki/Plokiahel "Plokiahel – Estonian")
- [Ελληνικά](https://el.wikipedia.org/wiki/Blockchain "Blockchain – Greek")
- [Español](https://es.wikipedia.org/wiki/Cadena_de_bloques "Cadena de bloques – Spanish")
- [فارسی](https://fa.wikipedia.org/wiki/%D8%B2%D9%86%D8%AC%DB%8C%D8%B1%D9%87_%D8%A8%D9%84%D9%88%DA%A9%DB%8C "زنجیره بلوکی – Persian")
- [Français](https://fr.wikipedia.org/wiki/Blockchain "Blockchain – French")
- [한국어](https://ko.wikipedia.org/wiki/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8 "블록체인 – Korean")
- [हिन्दी](https://hi.wikipedia.org/wiki/%E0%A4%96%E0%A4%A3%E0%A5%8D%E0%A4%A1%E0%A4%B6%E0%A5%83%E0%A4%82%E0%A4%96%E0%A4%B2%E0%A4%BE "खण्डशृंखला – Hindi")
- [Íslenska](https://is.wikipedia.org/wiki/Blockchain "Blockchain – Icelandic")
- [Italiano](https://it.wikipedia.org/wiki/Blockchain "Blockchain – Italian")
- [עברית](https://he.wikipedia.org/wiki/%D7%91%D7%9C%D7%95%D7%A7%D7%A6%27%D7%99%D7%99%D7%9F "בלוקצ'יין – Hebrew")
- [ქართული](https://ka.wikipedia.org/wiki/%E1%83%91%E1%83%9A%E1%83%9D%E1%83%99%E1%83%A9%E1%83%94%E1%83%98%E1%83%9C%E1%83%98 "ბლოკჩეინი – Georgian")
- [Қазақша](https://kk.wikipedia.org/wiki/%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD "Блокчейн – Kazakh")
- [Latviešu](https://lv.wikipedia.org/wiki/Blok%C4%B7%C4%93de "Blokķēde – Latvian")
- [Lumbaart](https://lmo.wikipedia.org/wiki/Blockchain "Blockchain – Lombard")
- [Magyar](https://hu.wikipedia.org/wiki/Blokkl%C3%A1nc "Blokklánc – Hungarian")
- [മലയാളം](https://ml.wikipedia.org/wiki/%E0%B4%AC%E0%B5%8D%E0%B4%B2%E0%B5%8B%E0%B4%95%E0%B5%8D_%E0%B4%9A%E0%B5%86%E0%B4%AF%E0%B4%BF%E0%B5%BB "ബ്ലോക് ചെയിൻ – Malayalam")
- [Монгол](https://mn.wikipedia.org/wiki/%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D1%8D%D0%B9%D0%BD "Блокчэйн – Mongolian")
- [Nederlands](https://nl.wikipedia.org/wiki/Blockchain "Blockchain – Dutch")
- [日本語](https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%83%81%E3%82%A7%E3%83%BC%E3%83%B3 "ブロックチェーン – Japanese")
- [Norsk](https://no.wikipedia.org/wiki/Blockchain "Blockchain – Norwegian")
- [Polski](https://pl.wikipedia.org/wiki/Blockchain "Blockchain – Polish")
- [Português](https://pt.wikipedia.org/wiki/Blockchain "Blockchain – Portuguese")
- [Română](https://ro.wikipedia.org/wiki/Blockchain "Blockchain – Romanian")
- [Русский](https://ru.wikipedia.org/wiki/%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD "Блокчейн – Russian")
- [Slovenčina](https://sk.wikipedia.org/wiki/Blockchain "Blockchain – Slovak")
- [Suomi](https://fi.wikipedia.org/wiki/Lohkoketju "Lohkoketju – Finnish")
- [Svenska](https://sv.wikipedia.org/wiki/Blockkedja "Blockkedja – Swedish")
- [Татарча/tatarça](https://tt.wikipedia.org/wiki/%D0%91%D0%BB%D0%BE%D0%BA%D0%BB%D0%B0%D1%80_%D1%87%D1%8B%D0%BB%D0%B1%D1%8B%D1%80%D1%8B "Блоклар чылбыры – Tatar")
- [ไทย](https://th.wikipedia.org/wiki/%E0%B8%9A%E0%B8%A5%E0%B9%87%E0%B8%AD%E0%B8%81%E0%B9%80%E0%B8%8A%E0%B8%99 "บล็อกเชน – Thai")
- [Türkçe](https://tr.wikipedia.org/wiki/Blok_zinciri "Blok zinciri – Turkish")
- [Українська](https://uk.wikipedia.org/wiki/%D0%91%D0%BB%D0%BE%D0%BA%D1%87%D0%B5%D0%B9%D0%BD "Блокчейн – Ukrainian")
- [Tiếng Việt](https://vi.wikipedia.org/wiki/Blockchain "Blockchain – Vietnamese")
- [中文](https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9D%97%E9%93%BE "区块链 – Chinese")

[Edit links](https://www.wikidata.org/wiki/Special:EntityPage/Q20514253#sitelinks-wikipedia "Edit interlanguage links")

- This page was last edited on 9 February 2018, at 13:27.

- Text is available under the [Creative Commons Attribution-ShareAlike License](//en.wikipedia.org/wiki/Wikipedia:Text_of_Creative_Commons_Attribution-ShareAlike_3.0_Unported_License);
additional terms may apply. By using this site, you agree to the [Terms of Use](//wikimediafoundation.org/wiki/Terms_of_Use) and [Privacy Policy](//wikimediafoundation.org/wiki/Privacy_policy). Wikipedia® is a registered trademark of the [Wikimedia Foundation, Inc.](//www.wikimediafoundation.org/), a non-profit organization.

- [Privacy policy](https://wikimediafoundation.org/wiki/Privacy_policy "wmf:Privacy policy")
- [About Wikipedia](/wiki/Wikipedia:About "Wikipedia:About")
- [Disclaimers](/wiki/Wikipedia:General_disclaimer "Wikipedia:General disclaimer")
- [Contact Wikipedia](//en.wikipedia.org/wiki/Wikipedia:Contact_us)
- [Developers](https://www.mediawiki.org/wiki/Special:MyLanguage/How_to_contribute)
- [Cookie statement](https://wikimediafoundation.org/wiki/Cookie_statement)
- [Mobile view](//en.m.wikipedia.org/w/index.php?title=Blockchain&mobileaction=toggle_view_mobile)
