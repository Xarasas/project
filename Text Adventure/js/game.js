// get elements
const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

// start game
function startGame() {
    state = {};
    showTextNode(1);
};

// show current Text
function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    };

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
};

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
};

// select options
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId < 0){
        return startGame();
    }
    state = Object.assign(state, option.setState) 
    showTextNode(nextTextNodeId);
};

const textNodes = [
    {
        id: 1,
        text: 'You find yourself alone in the woods, not knowing how you even got here. As you look down upon your hands you see blood all over your fingers. On the ground you see a knive.',
        options:[
            {
                text: 'Take the knive',
                setState: { knive: true },
                nextText: 2
            },
            {
                text: 'Leave the knive on the ground',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'In the distance you see a faint light, illuminating its way through the dark woods.',
        options:[
            {
                text: 'Go towards the light',
                nextText: 3.1
            },
            {
                text: 'Go away from the light',
                nextText: 4
            }
        ]
    },
    {
        id: 3.1,
        text: 'As you walk towards the direction of the light, you notice that it appears in different colors, on and off and you start hearing the voices of several people.',
        options:[
            {
                text:'keep going',
                nextText: 3.2
            },
            {
                text:'walk away',
                nextText: 4,
            },
            {
                text:'hide yourself',
                nextText: 5
            }
        ]
    },
    {
        id: 3.2,
        text:'You keep walking and after a while you start to distinguish the colors. A bright red and blue, accompanied by the yellowish shine of several flashlights. It has to be the police. Seems like they are.. searching for something. Or someone.',
        options:[
            {
                text:'Walk up to one of the officers and try to explain the situation',
                nextText: 3.3
            },
            {
                text:'Start to run away',
                nextText: 4
            }
        ]
    },
    {
        id: 3.3,
        text:'As soon as the officer spots you, he seems nervous and places his hand on his gun, although still keeping it in the holster. "Do not move!" he yells, as he shines his flash light on you.',
        options:[
            {
                text:'Conceal the knife',
                requiredState: (currentState) => currentState.knive,
                nextText: 3.4
            },
            {
                text:'"please help me, I am lost!"',
                nextText: 3.41
            },
            {
                text: 'try to run away',
                nextText: 3.6
            }
        ]
    },
    {
        id: 3.41,
        text: 'The officer notices the knife in your hands, still covered in blood, and he draws his gun. "Drop the knife!" he stutters, now seemingly more nervoues then before',
        options:[
            {
                text: 'Drop the knife',
                nextText: 3.4,
                setState: { knive: false }
            },
            {
                text: 'Attack the officer',
                nextText: 3.61
            },
        ]
    },
    {
        id: 3.4,
        text:'"On the ground!" the officer shouts as he slowly approaches you and you comply with his orders.',
        options:[
            {
                text:'You say nothing and let the officer approach you',
                nextText: 3.5
            },
            {
                text:'"Please, I suddenly woke up with blood on my hands. I dont even know how I got here!"',
                nextText: 3.7
            },
            {
                text:'You lunge forward and try to attack the officer with the knife',
                requiredState: (currentState) => currentState.knive,
                nextText: 3.6
            },
        ]
    },
    {
        id: 3.5,
        text: 'As he slowly walks towards you, you can already hear other people approaching. As he stands right in front of you, he reaches for the handcuffs',
        options:[
            {
                text: 'Let him arrest you',
                nextText: 6
            },
            {
                text: 'You take the concealed knife and stab him in the leg',
                requiredState: (currentState) => currentState.knive,
                nextText: 7
            }
        ]
    },
    {
        id: 3.6,
        text: 'As you begin to move the officer has enough time to draw his gun and shoots you. You die due to the fatal wound on the way to the hospital.',
        options:[
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 3.61,
        text: 'As you suddenly begin to move the officer shoots you in the head. You die instantly.',
        options:[
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    }
]

startGame();