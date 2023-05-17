function alterPage(e, pg) {
  var pages = document.querySelectorAll(".page")

  if (pg == undefined) {
    document.querySelectorAll(".btn-headers").forEach((bh) => {
      bh.classList.remove("effect")
    })
    document.querySelectorAll(".btn-headers-op").forEach(bho => {
      bho.style.height = "0px"
    })
    document.querySelectorAll("#abertoMaior").forEach((ab) => {
      ab.style.transform = "rotate(0deg)"
    })
  }

  pages.forEach((p) => {
    if (p.id == e.id) {
      p.classList.remove("model")
      if (pg === undefined) {
        e.classList.add("effect")
      }
    } else {
      p.classList.add("model")
      document.querySelectorAll(".btn").forEach((btn) => {
        if (btn.id !== e.id) {
          btn.classList.remove('effect')
        }
      })
    }
    document.querySelectorAll(".spanHeader").forEach((y) => {
      y.style.color = "#fff"
    })
    if (pg !== undefined) {
      e.style.color = "#000"
    }
  })
}

function openBtnHeaders(e) {

  var div = document.querySelector("#" + e.getAttribute("nameHeader"))

  document.querySelectorAll("#abertoMaior").forEach((ab) => {
    ab.style.transform = "rotate(0deg)"
  })

  if (e.getAttribute("aberto") == "true") {
    e.setAttribute("aberto", "false")
    div.style.height = "0px"
  } else {
    document.querySelectorAll(".btn-headers").forEach((aberto) => {
      if (aberto.getAttribute("aberto") == "true") {
        document.querySelector("#" + aberto.getAttribute("nameHeader")).style.height = "0px"
        aberto.setAttribute("aberto", "false")
        e.querySelector("#abertoMaior").style.transform = 'rotate(0deg)'
      }
    })
    document.querySelectorAll(".btn-headers").forEach((effect) => {
      effect.classList.remove("effect")
    })
    e.classList.add("effect")
    div.style.height = "100px"
    e.querySelector("#abertoMaior").style.transform = "rotate(-90deg)"
    e.setAttribute("aberto", "true")
  }
}