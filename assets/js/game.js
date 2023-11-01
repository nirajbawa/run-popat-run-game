let keyup = false
let score = 0
let cross = true

let intTime = 3000

let popatLalbgSound = new Audio('../assets/sound_effects/papatlalbgSound.mp3')
let popatLalDialog = new Audio('../assets/sound_effects/popatlalDialog.mp3')
let popatLalDialog2 = new Audio('../assets/sound_effects/popatsoundeffect2.mp3')

let jethaLalbgSound = new Audio('../assets/sound_effects/jethalalbgSound.mp3')
let jethaLalDialog = new Audio('../assets/sound_effects/jethalaldialog.mp3')
let socreTime 

let popatInterval
let jethaInterval


const setTimeoutAudiop = (t) => {
    setTimeout(() => {
        popatLalbgSound.play()
        popatInterval = setInterval(popatDialog, 5000);
        jethaInterval = setInterval(jethaDialog, 10000);
        setTimeoutAudioj(15000)
    }, t)
}

const setTimeoutAudioj = (t) => {
    setTimeout(() => {
        jethaLalbgSound.play()
        setTimeoutAudiop(16000)
    }, t)
}

setTimeoutAudiop(500)





const jethaDialog = () => {
    jethaLalDialog.play()
}

const popatDialog = () => {
    popatLalDialog.play()
}

const socreTimeset = () =>{
    cross = true
}

document.onkeydown = (e) => {
    console.log("key code is : " + e.keyCode)
    let popatlal = document.querySelector(".popatLal")
    if (e.keyCode == 38 && keyup == false) {
        popatlal.classList.add('poptalAni')
        keyup = true
        setTimeout(() => {
            popatlal.classList.remove('poptalAni')
            keyup = false
        }, intTime)
    }
}

setInterval(() => {
    let popatlal = document.querySelector('.popatLal')
    let jethalal = document.querySelector('.jethaLal')
    let gameOver = document.querySelector('.gameOver')
    let navBox = document.querySelector('.nav')

    let dx = parseInt(window.getComputedStyle(popatlal, null).getPropertyValue('left'))
    let dy = parseInt(window.getComputedStyle(popatlal, null).getPropertyValue('top'))

    let ox = parseInt(window.getComputedStyle(jethalal, null).getPropertyValue('left'))
    let oy = parseInt(window.getComputedStyle(jethalal, null).getPropertyValue('top'))


    let offsetx = Math.abs(dx - ox)
    let offsety = Math.abs(dy - oy)

    // console.log(offsetx)
    // console.log(offsety)

    if (offsetx < 95 && offsety < 52) {
        gameOver.style.visibility = "visible"
        navBox.classList.add('gameOverBox')
        jethalal.classList.remove('jethaLalAni')
        cross = null
        clearInterval(popatInterval)
        clearInterval(jethaInterval)
        clearTimeout(socreTime)
        setTimeout(()=>{
            popatLalDialog2.play()
        }, 500)
    }
    else if (cross) {
        score += 1
        updateScore(score)
        cross = false
        socreTime = setTimeout(socreTimeset, 100)

        setTimeout(() => {
            let aniDuration = parseFloat(window.getComputedStyle(jethalal, null).getPropertyValue('animation-duration'))
            let newDuration = aniDuration - 0.1;
            console.log(newDuration)
            if (newDuration > 4) {
                jethalal.style.animationDuration = newDuration + 's'
                intTime -= 10
            }

        }, 1000);
    }

}, 100)


const updateScore = (value) => {
    document.getElementById("scoreCount").innerText = 'Your Score : ' + value
}

document.getElementsByClassName('restart')[0].addEventListener('click', () => {
    location.reload()
})