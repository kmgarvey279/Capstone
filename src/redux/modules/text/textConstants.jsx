export const examine = {
  tank1: {1: ['Some sort of storage tank.', 'You can barely make out a human-like shape through the frosted glass.']},
  tank2: {1: ['Some sort of storage tank.', 'You can barely make out a human-like shape through the frosted glass.']},
  tube: {1: ['Some sort of storage tank.', 'You can barely make out a human-like shape through the frosted glass.']},
  uglyBed1: {1: ['A truely hideous bed.', 'Just looking at it hurts your eyes.']},
  uglyBed2: {1: ['A truely hideous bed.', 'Just looking at it hurts your eyes.']},
  shelf: {1: ['A shelf filled with assorted junk.', 'Nothing looks worth taking.']},
  terminal1: {1: ['Logging in...'],
              2: ['options', 'Please input new door lock status:', ['Lock','Unlock']],
              3: ['results', ['Door Lock Engaged.','Door Lock Disengaged.']],
              4: ['Logging Out...']
            },
  terminal2: {1: ['I can\'t believe the idiots I\'m trapped on this ship with.', 'Dr _____ continues to waste her time on Cryonic research. Not a single test subject has been successfully revitalized.', 'Quite the sick joke our predacessors played, freezing hundreds of people without the slightest idea of how to bring them back.'],
             2: ['What\'s even the point of bringing them back to life if we can\'t find another habitable planet. The ship certainly can\'t support them.', 'Even with the curent skeleton crew alone, it we\'ll be out of supplies in a few decades at most.'],
             3: ['Our only chance of survival is to look beyond this narrow sliver of time and space into the wider expanse of all possible worlds, or rather, all possible futures.', 'I should be grateful to by benevolnet corperate overlords of the the resouces and briliant reseachers they\'ve given me. I certainly wouldn\'t have been so lucky were I selected to serve on one of the Earth Union\'s ships.'],
             4: ['On the other hand, someone like Dr ____ would have never been treated so charitably by the government buracrats.', 'There\'s vision and then there\'s... whatever madness it is that he\'s pursuing. It\'s an open secret at this point that that the frozen bodies of some of the less well-connected individuals who managed to bribe (or prehaps blackmail) themselves on this ship have been entering his lab, never to be seen again']
            },
  terminal3: {1: ['Log: 10/25/2132: Another round of failures. We were unable to revitalize a single specimen.', 'I\'ve lost track of how many rats we\'ve killed at this point. I know it goes against the heart of the scientific method, but keeping track just got to be too demoralizing.'],
              2: ['Virtually all of the researchers have loved ones frozen on this ship or others, and the posibility that they are gone for good is too much for any of us to bear.'],
              2: ['In a sense, this is also what drives us. If there is nothing else we can do, prehaps we can at least prevent humanity\'s final great act of coordenation from amounting to the greatest mass murder in history.', 'Even a single surviving test subject would prove that the cryogensis process isn\'t just a mercy killing bound up in false hope...']
            },
  terminal4: {1: ['I heard her voice again. Beautiful. Haunting. It makes me feel like the entire rise and fall of the human race was all worth it. Just for one lowely human to experence such sublime majesty.'],
              2: ['After requesting access to some of the technology dr. ____\'s team was working on, I was able to confirm my hypothesis.', 'The life forms I have been studying were indeed attracted to the dimentional distortions produced by the same technology that powers this ship.'],
              3: ['Our ship no doubt drew the organisms to us in the first place.', 'If I could only find a way to amplifiy them further, prehaps the ship could serve as an even more effective beacon. Prehaps even one strong enough to catch HER many eyes...']
            },
  terminal5: {1: ['When dimentional technology was first developed as a power source, a common debate amoung the top minds in the field revolved around the exact source of the nearly endless supply of energy it allowed us to tap into.'],
              2: ['One theory that I found quite laughable at the time said that it was in fact drawing the power from other iterations of earth. As if in some distant dimention, entire cities were going dark just for us to heat up our microwave burritos or prehaps depriving their planet of solar warmth to fuel our funny cat pictures.'],
              3: ['However, looking back at the years leading to our exodus from earth, I\'m not so sure it wasn\'t on to something. After all, if we discovered such a technology, wouldn\'t it also follow that other versions of us would discover it as well?', 'What if by the time we disovered it, another version of earth had already advanced to the point where it was capable of draining the interdiemntional commons dry?'],
              4: ['Our cities didn\'t go dark, at least not at first, but the prevesive sense of decline was undeniable. Prehaps rather than a simple syphoning of energy, it was a more insidious process. For example, what if we were essentually inheriting the entropic debt of other dimentions?'],
              5: ['Even now, I can\'t help but ask myself how many alternative versions of ourselves we\'re dooming in order to fuel our ship\'s hopeless journey.'],
              6: ['The liklihood of any of us abord this ship making the breakthrough\'s nessicary to survive grows smaller and smaller every day.', 'However, there is still one chance, or rather a million billion chances, since that\'s how many we\'d need.', 'Even if I fail to solve this riddle, even if a million versions of myself fail, as long as it\'s within the relm of possibility, as long as one-in-a-million succeeds, prehaps humanity can still have a future.'],
              7: ['I\'ll send out a broadcast of sorts, one that should reach any version of myself. Dr. ____ has already layed the ground-work of a rely, prehaps together we can actually do this. Dr. ____ seems anxious, but now is no time for petty squabiling. I may not like Dr. ____, but there is no doubt that the man is a genious.']
            },
  phone1: {1: ['test']
  }
          }
     
export const dialogue = {
  A1: {
    1: ['Strange Voice', ['As I am sure you\'ve noticed, the door to this room is locked.', 'The terminal next to you should be able to override the lock.', 'I\'d do it myself, but I have limited access to this facility\'s security system.']],
    2: ['Confused Girl', ['...']],
    3: ['Strange Voice', ['No doubt you have a number of questions.', 'They will be answered in due time, but before any of that, you will need a name.']],
    4: ['Very Confused Girl', ['...']],
    5: ['Strange Voice', ['Unfortunately, your records on file have been irreversibly corrupted and it is impossible to determine your identity.', 'However, no need to despair. Think of this as a fresh start.', 'You can be whomever you want!']],
    6: ['', ['textInput', 'Name Her!']],
    7: ['Strange Voice', ['Hmm. Your suggestion has been duely noted. Thank you for your input.', 'Your name will henceforth be "Aurora"', 'It is ""SYMBOLIC"".']],
    8: ['Strange Voice', ['Truly much more fitting than your old forgotten name or any silly suggestion whispered through the ether by a bunch of nobodies who seem to be under the mistaken impression that their opinions hold any weight here.']],
    8: ['Aurora', ['...']],
    9: ['Strange Voice', ['See? Much better.']]
  },
  B1: {
    1: ['Strange Voice', ['Clever girl.']],
    2: ['Clever Girl', ['...']],
    3: ['Strange Voice', ['No doubt you have a number of questions.', 'They will be answered in due time, but before any of that, you will need a name.']],
    4: ['Confused Girl', ['...']],
    5: ['Strange Voice', ['Unfortunately, your records on file have been irreversibly corrupted and it is impossible to determine your identity.', 'However, no need to despair. Think of this as a fresh start.', 'You can be whomever you want!']],
    6: ['', ['textInput', 'Name Her!']],
    7: ['Strange Voice', ['Hmm. Your suggestion has been duly noted. Thank you for your input.', 'Your name will hensefore be Aurora', 'It is ""SYMBOLIC"".']],
    8: ['Strange Voice', ['Truly much more fitting than your old forgotten name or any silly suggestion whispered through the ether by a bunch of nobodies who seem to be under the mistaken impression that their opinions hold any weight here.']],
    8: ['Aurora', ['...']],
    9: ['Strange Voice', ['See? Much better.']]
  },
  A2: {
    1: ['???', ['My, how inconvenient.', 'It would appear that you will need to find something to weigh the switch in your stead.', 'Might I suggest one of those ample boxes lying around?', 'Fortunately for us, it has been quite some time since the facility\'s cleaning crew was last online.']],
    2: ['Aurora', ['...']],
    3: ['???', ['You are quite the silent type, aren\'t you?', 'No matter, that suits me just fine.', 'You deal with the heavy lifting and I shall continue to provide you with indispensable guidence.']]
  },
  B2: {
    1: ['???', ['Astonishing! Have you done this sort of thing before?', 'To complete such a complex puzzle without any of my assistance is no small feat!', 'To think that my mentorship could transform you so quickly into a puzzle-solving master.']],
    2: ['Aurora', ['...']],
    3: ['???', ['You are quite the silent type, aren\'t you?', 'No matter, that suits me just fine.', 'You deal with the heavy lifting and I shall continue to provide you with indispensable guidence.']]
  },
  A3: {
    1: ['???', ['Wow! This looks like a tough one. If you want to make it across the ice...']],
    2: ['Aurora', ['Okay, dude. I get it, you\'re some sort of evil AI pretending to be a human. Give it up, it\'s just painful to listen to. I\'ve been BSing my way through this acting like a human thing for years and no silocone satan is going to beat me at my own game.']],
    3: ['???', ['<updating priors>.', 'Interesting, I was under the impression that you were more of the silent type']],
    4: ['Aurora', ['Yeah, I was mostly just hoping you\'d shut up if I ignored you, but clearly that didn\'t work', 'Anything is better then sitting through another one of your tutorials. I get it, physics exists.']],
    5: ['???', ['Regardless, I am afraid you are wrong about me. I am definetly not a robot, but even if I was, I definetly would not be an evil one.']],
    6: ['Aurora', ['Like, I don\'t care either way. Who am I to judge? I get the impression that you genuinly need me alive for some reason, so we might as well put off the part where we try to kill one another until later.']],
    7: ['Aurora', ['Anyway, sorry to ruin your *SYMBOLISM*, but my name is actually Clare. You can keep calling me Auora if you want, but if you do I\'m going to start calling you...']],
    8: ['???', ['textInput', 'Name... him? them? it?']],
    9: ['???', ['Alright, point taken.', 'Assigning referents to sentient objects is rude... no matter how deep the SYMBOLISM.', 'I will henceforth refrain and call you by your boring, meaningless name.']],
    10:['Clare', ['Sweet. Looks like we totally hashed out our conflicts and crap. Character arcs completes.']],
    11:['???', ['Yes, yes, quite the display of <sarcasm>sarcasm</sarcasm>.', 'Now tell me, could a mere machine accurately detect sarcasm with such percision?']],
    12:['Clare', ['Honistly, I have no idea. I\'ve never actually come face-to... disembodied-voice with an intelligent machine before.', 'I guess it\'s possible you\'re actually a human pretending to be a robot pretending to be a human, but to reiterate: I don\'t really care.']],
    13:['Clare', ['By the way, what should I call you?', 'Do you have, like, a sinister sounding acronum you go by or anything?', 'Do you have any pronoun prefs or dietary restrictions I should know about? Cuz that\'s totally cool.']],
    13:['???', ['Hmmm, ...do I have a name?', 'I mean, of course I have a name, and it\'s not symbolic at all. It\'s Magellan...ifer.', 'A totally normal human name.', 'You may refer to me using... male pronouns, because I am in fact a human male.', 'I sure like drinking fermented beverages and watching The Game, and I sure hate sustaining blunt force trama to my external genitalia.']],
    14:['Clare', ['Well, I\'m convinced. Nice to meet you Magellanifer.']]
  }
}

export const flavorText = {
  keyCard1: ['You found a keycard!', 'It\'s labeled: "Security Clearance: Level 1". Hopefully it will at least get you into the lunchroom, you\'re starving.'],
  keyCard2: ['You found a keycard!', 'It\'s labeled: "Security Clearance: Level 2". Hopefully it will at least get you into the lunchroom, you\'re starving.'],
  Taser: ['You found the Taser Gun!', 'A weapon designed for non-lethal self-defense that fires bolts of electricty. It can also be used to temporarily charge electronic equipment.']
}

// const dialogue2 = {
//   ['', 'Still in one piece, I see. * Maybe this will actually work. * Ahem, I appologise for not properly introducing myself earlier. I am the overseer of the cryogenics ']
// }
//
//
// Okay, dude. I get it, you're some sort of evil AI pretending to be a human. Give it up, it's just painful to listen to. I've been BSing my way through this being human thing for years and no silocone satan is going to beat me at my own game.
// ['', '<updating priors>. I was under the impression that you were more of the silet type.
// ['', Yeah, I was mostly just hoping you'd shut up if I ignored you, but clearly *that* didn't happen. Anything is better then sitting through another one of your tutorials. I get it, physics exists.
// ['', Regardless, I am afraid you are wrong about me. I am definetly not a robot, but even if I was, I definetly would not be an evil one.
// ['', Like, I don't care either way. Who am I to judge? I get the impression that you genuinly need me alive for some reason, so we might as well put off the historical reinactments of the Terminator movies for later.
// ['', Anyway, sorry to ruin your SYMBOLISM, but my name is actually Clare. You can keep calling me Auora if you want, but if you do I'm going to start calling you...]
// ['', Assigning arbitray referents to sentient objects is !good. No matter how deep the SYMBOLISM. I will henceforth refrain.]
// ['Clare', Sweet. Looks like we totally hashed out our conflicts and crap. Plot arc complete. We win at relationships.]
// ['', Yes, yes, quite the display of <sarcasm></sarcasm>. Tell me, could a mere machine accurately detect sarcasm?]
// ['Clare', Honistly, I have no idea. I've never actually come face-to-disembodied-voice with an intelligent machine before. I guess it's possible you're actually a human pretending to be a robot pretending to be a human, but to reiterate: I don't really care. If that's what gets your rocks off, knock yourself out.]
// ['', Of course, I fully comprehend your non-literal use of language. As I human I know full well that by <Clare>knock yourself out</Clare> you mean to engage in a particular behavior without regards to the outcome. When you say <Clare>get your rocks off</Clare>, you mean
// ['Clare' Yeah, that about wraps it up for this conversation.]
//
// So, I have to ask, where exactly are we? Like, I get that there are a bunch of popcicle people being stored here, but are we underground or what? Just what year is it?
// I do not have precise answers to either of your questions. I can state with certaintly that <Truth>the most recent log in the central database was made on December 17, 2139</Truth>
// 'Clare', 'Umm, what? Do you really think that is going to convince me? Why would I belive you just because you put special brackets around your words?'
// I am bound by my... umm, religious affliation, <Truth>to only allow the absolute truth within these sacred brackets!</Truth>
// Ok, let's give this a try. Say "I'm not a robot" inside the brackets.
// Very well, <Truth>I am not a robot</Truth>
// Say "I'm a human, just like Clare, the human currently speaking. I'm not an digitally uploaded human brain or some sort of vat-grown organic supercomputer";
// ...
// Ok, I'll trust your brackets for the time being. Obviously you might be lying about everything and just prefer for me to believe in your brackets rather than your humanity, but if we're going to work together, I'm willing to at least act like I believe some of the things you're saying.
// So taking your truth as gospal for the moment, I'm at least 100 years in the future. I remember pleanty about my life, but I have no idea how I ended up here.
// What's the deal with the frozen dudes? Are we waiting out some plague or something?
// I do not know. I am unable to access the personal records of the clients or any information about the state of the world ouside these walls. Like you, simply woke up one day.
// How long ago was that?
// I... have lost track of the time. <Truth>I woke up and went back to sleep multiple times, but have no idea of how long of a gap existed between each awakening</Truth>
//
