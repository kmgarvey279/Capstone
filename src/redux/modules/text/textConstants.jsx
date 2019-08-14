export const examine = {
  tank: {1: ['Some sort of storage tank.', 'You can barely make out a human-like shape through the frosted glass.']},
  uglyBed1: {1: ['A truely hideous bed.', 'Just looking at it hurts your eyes.']},
  uglyBed2: {1: ['A truely hideous bed.', 'Just looking at it hurts your eyes.']},
  terminal1: {1: ['Guest %*#@*# successfully revitalized. All vital signs normal. Stored belongings have been returned to the guest.', 'Inventory: 1) fresh as hell rags. 2) wicked ass boots.'],
              2: ['options', 'Please input new door lock status:', ['Lock','Unlock']],
              3: ['results', ['Door Lock Engaged.','Door Lock Disengaged.']],
              4: ['Logging Out...']}
}

export const dialogue = {
  A1: {
    1: ['???', ['As I am sure you\'ve noticed, the door to this room is locked.', 'The terminal next to you should be able to override the lock.', 'I\'d do it myself, but I have limited access to this facility\'s security system.']],
    2: ['Confused Girl', ['...']],
    3: ['???', ['No doubt you have a number of questions.', 'They will be answered in due time, but before any of that, you will need a name.']],
    4: ['Very Confused and Mildly Annoyed Girl', ['...']],
    5: ['???', ['Unfortunately, your records on file have been irreversibly corrupted and it is impossible to determine your identity.', 'However, no need to despair. Think of this as a fresh start.', 'You can be whomever you want!']],
    6: ['', ['textInput', 'Name Her!']],
    7: ['???', ['Hmm. Your suggestion has been duly noted. Thank you for your input.', 'Your name will hensefore be Aurora', 'It is ""SYMBOLIC"".']],
    8: ['???', ['Truly much more fitting than your old forgotten name or any silly suggestion whispered through the ether by a bunch of nobodies who seem to be under the mistaken impression that their opinions hold any weight here.']],
    8: ['Aurora', ['...']],
    9: ['???', ['See? Much better.']]
  },
  B1: {
    1: ['???', ['Clever girl.']],
    2: ['Clever Girl', ['...']],
    3: ['???', ['No doubt you have a number of questions.', 'They will be answered in due time, but before any of that, you will need a name.']],
    4: ['Very Confused and Mildly Annoyed Girl', ['...']],
    5: ['???', ['Unfortunately, your records on file have been irreversibly corrupted and it is impossible to determine your identity.', 'However, no need to despair. Think of this as a fresh start.', 'You can be whomever you want!']],
    6: ['', ['textInput', 'Name Her!']],
    7: ['???', ['Hmm. Your suggestion has been duly noted. Thank you for your input.', 'Your name will hensefore be Aurora', 'It is ""SYMBOLIC"".']],
    8: ['???', ['Truly much more fitting than your old forgotten name or any silly suggestion whispered through the ether by a bunch of nobodies who seem to be under the mistaken impression that their opinions hold any weight here.']],
    8: ['Aurora', ['...']],
    9: ['???', ['See? Much better.']]
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
}

export const flavorText = {
  keyCard1: ['You found a keycard!', 'It\'s labeled: "Security Clearance: Level 1". Hopefully it will at least get you into the lunchroom, you\'re starving.'],
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
