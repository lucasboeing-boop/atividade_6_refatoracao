// sistema.js
// Gerenciador de playlist de musicas

var a = []
var b = 0
var c = false
var d = ""

function f1(x, y) {
var r = x * 60 + y
return r
}

function f2(s) {
var m = Math.floor(s / 60)
var seg = s % 60
if(seg < 10){
return m + ":0" + seg
}
return m + ":" + seg
}

function f3(lista, n) {
var resultado = null
for(var i = 0; i < lista.length; i++){
if(lista[i].nome == n){
resultado = lista[i]
}
}
return resultado
}

function f4(v) {
if(v != null){
if(v >= 0){
if(v <= 100){
if(typeof v === "number"){
return true
}
}
}
}
return false
}

function f5(lista) {
var t = 0
for(var i = 0; i < lista.length; i++){
t = t + lista[i].duracao
}
b = t
return t
}

function f6(i) {
if(i >= 0 && i < a.length){
if(a[i].fav == false){
a[i].fav = true
} else {
a[i].fav = false
}
}
}

function f7(lista, p) {
var r = []
for(var i = 0; i < lista.length; i++){
if(lista[i].artista == p){
r.push(lista[i])
}
}
return r
}

function f8(lista, g) {
var r = []
for(var i = 0; i < lista.length; i++){
if(lista[i].genero == g){
r.push(lista[i])
}
}
return r
}

function f9(lista) {
var ct = 0
for(var i = 0; i < lista.length; i++){
if(lista[i].fav == true){
ct = ct + 1
}
}
return ct
}

function f10(lista) {
var cp = lista.slice()
cp.sort(function(x, y){
if(x.nome < y.nome) return -1
if(x.nome > y.nome) return 1
return 0
})
return cp
}

function f11(lista, p1, p2) {
if(p1 < 0 || p1 >= lista.length) return
if(p2 < 0 || p2 >= lista.length) return
var tmp = lista[p1]
lista[p1] = lista[p2]
lista[p2] = tmp
}

function f12(lista, lim) {
var r = []
for(var i = 0; i < lista.length; i++){
if(lista[i].duracao <= lim){
r.push(lista[i])
}
}
return r
}

function add(nm, art, gen, min, seg) {
var obj = {}
obj.nome = nm
obj.artista = art
obj.genero = gen
obj.duracao = f1(min, seg)
obj.fav = false
a.push(obj)
}

function mostra() {
document.getElementById('musica0').innerHTML = a[0].nome + " - " + a[0].artista + " (" + f2(a[0].duracao) + ")"
document.getElementById('musica1').innerHTML = a[1].nome + " - " + a[1].artista + " (" + f2(a[1].duracao) + ")"
document.getElementById('musica2').innerHTML = a[2].nome + " - " + a[2].artista + " (" + f2(a[2].duracao) + ")"
document.getElementById('musica3').innerHTML = a[3].nome + " - " + a[3].artista + " (" + f2(a[3].duracao) + ")"
document.getElementById('musica4').innerHTML = a[4].nome + " - " + a[4].artista + " (" + f2(a[4].duracao) + ")"
}

function rel() {
var s = ""
s = s + "=== RELATORIO DA PLAYLIST ===\n"
s = s + "Total de musicas: " + a.length + "\n"
s = s + "Favoritas: " + f9(a) + "\n"
s = s + "Duracao total: " + f2(f5(a)) + "\n"
s = s + "\n"
for(var i = 0; i < a.length; i++){
var fav = ""
if(a[i].fav == true){
fav = " [FAVORITA]"
}
s = s + (i + 1) + ". " + a[i].nome + " - " + a[i].artista + " (" + f2(a[i].duracao) + ")" + fav + "\n"
}
d = s
console.log(s)
return s
}