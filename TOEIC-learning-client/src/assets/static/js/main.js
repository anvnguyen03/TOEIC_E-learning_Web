var APP = APP || {};
APP.main = webpackJsonpAPP__name_([1], {
    196: function(t, e, n) {
        "use strict";
        !function(t) {
            var e = "data-highlighted"
              , n = "data-timestamp"
              , i = {
                ELEMENT_NODE: 1,
                TEXT_NODE: 3
            }
              , o = ["SCRIPT", "STYLE", "SELECT", "OPTION", "BUTTON", "OBJECT", "APPLET", "VIDEO", "AUDIO", "CANVAS", "EMBED", "PARAM", "METER", "PROGRESS"];
            function a(t, e) {
                return s(t).color() === s(e).color()
            }
            function r(t, e) {
                for (var n in t = t || {},
                e)
                    e.hasOwnProperty(n) && void 0 === t[n] && (t[n] = e[n]);
                return t
            }
            function l(t, e) {
                t.sort(function(t, n) {
                    return s(e ? n : t).parents().length - s(e ? t : n).parents().length
                })
            }
            var s = function t(e) {
                return {
                    addClass: function(t) {
                        e.classList ? e.classList.add(t) : e.className += " " + t
                    },
                    removeClass: function(t) {
                        e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t + "(\\b|$)","gi"), " ")
                    },
                    prepend: function(t) {
                        for (var n = Array.prototype.slice.call(t), i = n.length; i--; )
                            e.insertBefore(n[i], e.firstChild)
                    },
                    append: function(t) {
                        for (var n = Array.prototype.slice.call(t), i = 0, o = n.length; i < o; ++i)
                            e.appendChild(n[i])
                    },
                    insertAfter: function(t) {
                        return t.parentNode.insertBefore(e, t.nextSibling)
                    },
                    insertBefore: function(t) {
                        if (t.parentNode)
                            return t.parentNode.insertBefore(e, t)
                    },
                    remove: function() {
                        e.parentNode && e.parentNode.removeChild(e),
                        e = null
                    },
                    contains: function(t) {
                        return e !== t && e.contains(t)
                    },
                    wrap: function(t) {
                        return e.parentNode && e.parentNode.insertBefore(t, e),
                        t.appendChild(e),
                        t
                    },
                    unwrap: function() {
                        var n, i = Array.prototype.slice.call(e.childNodes);
                        return i.forEach(function(e) {
                            n = e.parentNode,
                            t(e).insertBefore(e.parentNode),
                            t(n).remove()
                        }),
                        i
                    },
                    parents: function() {
                        for (var t, n = []; t = e.parentNode; )
                            n.push(t),
                            e = t;
                        return n
                    },
                    normalizeTextNodes: function() {
                        if (e) {
                            if (e.nodeType === i.TEXT_NODE)
                                for (; e.nextSibling && e.nextSibling.nodeType === i.TEXT_NODE; )
                                    e.nodeValue += e.nextSibling.nodeValue,
                                    e.parentNode.removeChild(e.nextSibling);
                            else
                                t(e.firstChild).normalizeTextNodes();
                            t(e.nextSibling).normalizeTextNodes()
                        }
                    },
                    color: function() {
                        return e.style.backgroundColor
                    },
                    fromHTML: function(t) {
                        var e = document.createElement("div");
                        return e.innerHTML = t,
                        e.childNodes
                    },
                    getRange: function() {
                        var n, i = t(e).getSelection();
                        return i.rangeCount > 0 && (n = i.getRangeAt(0)),
                        n
                    },
                    removeAllRanges: function() {
                        t(e).getSelection().removeAllRanges()
                    },
                    removeRange: function(n) {
                        t(e).getSelection().removeRange(n)
                    },
                    getSelection: function() {
                        return t(e).getWindow().getSelection()
                    },
                    getWindow: function() {
                        return t(e).getDocument().defaultView
                    },
                    getDocument: function() {
                        return e.ownerDocument || e
                    }
                }
            };
            function c(t, e) {
                if (!t)
                    throw "Missing anchor element";
                var n, i;
                this.el = t,
                this.options = r(e, {
                    color: "#ffff7b",
                    underline: null,
                    crossed: null,
                    highlightedClass: "highlighted",
                    contextClass: "highlighter-context",
                    onRemoveHighlight: function() {
                        return !0
                    },
                    onBeforeHighlight: function() {
                        return !0
                    },
                    onAfterHighlight: function() {}
                }),
                s(this.el).addClass(this.options.contextClass),
                n = this.el,
                i = this,
                n.addEventListener("mouseup", i.highlightHandler.bind(i)),
                n.addEventListener("touchend", i.highlightHandler.bind(i)),
                n.addEventListener("touchcancel", i.highlightHandler.bind(i))
            }
            c.prototype.destroy = function() {
                var t, e;
                t = this.el,
                e = this,
                t.removeEventListener("mouseup", e.highlightHandler.bind(e)),
                t.removeEventListener("touchend", e.highlightHandler.bind(e)),
                t.removeEventListener("touchcancel", e.highlightHandler.bind(e)),
                s(this.el).removeClass(this.options.contextClass)
            }
            ,
            c.prototype.highlightHandler = function(t) {
                2 === t.detail ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && this.doHighlight() : this.doHighlight()
            }
            ,
            c.prototype.doHighlight = function(t) {
                var e, i, o, a, r = s(this.el).getRange();
                r && !r.collapsed && !0 === this.options.onBeforeHighlight(r) && (a = +new Date,
                (e = c.createWrapper(this.options)).setAttribute(n, a),
                i = this.highlightRange(r, e),
                o = this.normalizeHighlights(i),
                this.options.onAfterHighlight(r, o, a),
                s(this.el).removeRange(r))
            }
            ,
            c.prototype.highlightRange = function(t, n) {
                if (!t || t.collapsed)
                    return [];
                var a, r, l, c = function(t) {
                    var e = t.startContainer
                      , n = t.endContainer
                      , o = t.commonAncestorContainer
                      , a = !0;
                    if (0 === t.endOffset) {
                        for (; !n.previousSibling && n.parentNode !== o; )
                            n = n.parentNode;
                        n = n.previousSibling
                    } else
                        n.nodeType === i.TEXT_NODE ? t.endOffset < n.nodeValue.length && n.splitText(t.endOffset) : t.endOffset > 0 && (n = n.childNodes.item(t.endOffset - 1));
                    return e.nodeType === i.TEXT_NODE ? t.startOffset === e.nodeValue.length ? a = !1 : t.startOffset > 0 && n === (e = e.splitText(t.startOffset)).previousSibling && (n = e) : e = t.startOffset < e.childNodes.length ? e.childNodes.item(t.startOffset) : e.nextSibling,
                    {
                        startContainer: e,
                        endContainer: n,
                        goDeeper: a
                    }
                }(t), d = c.startContainer, h = c.endContainer, u = c.goDeeper, f = !1, g = d, p = [];
                do {
                    u && g.nodeType === i.TEXT_NODE && (-1 === o.indexOf(g.parentNode.tagName) && "" !== g.nodeValue.trim() && ((r = n.cloneNode(!0)).setAttribute(e, !0),
                    l = g.parentNode,
                    (s(this.el).contains(l) || l === this.el) && (l.style !== r.style && l.style.backgroundColor || (a = s(g).wrap(r),
                    p.push(a)))),
                    u = !1),
                    g !== h || h.hasChildNodes() && u || (f = !0),
                    g.tagName && o.indexOf(g.tagName) > -1 && (h.parentNode === g && (f = !0),
                    u = !1),
                    u && g.hasChildNodes() ? g = g.firstChild : g.nextSibling ? (g = g.nextSibling,
                    u = !0) : (g = g.parentNode,
                    u = !1)
                } while (!f);
                return p
            }
            ,
            c.prototype.normalizeHighlights = function(t) {
                var e;
                return this.flattenNestedHighlights(t),
                this.mergeSiblingHighlights(t),
                e = t.filter(function(t) {
                    return t.parentElement ? t : null
                }),
                (e = e.filter(function(t, e, n) {
                    return n.indexOf(t) === e
                })).sort(function(t, e) {
                    return t.offsetTop - e.offsetTop || t.offsetLeft - e.offsetLeft
                }),
                e
            }
            ,
            c.prototype.flattenNestedHighlights = function(t) {
                var e, n = this;
                function i() {
                    var e = !1;
                    return t.forEach(function(i, o) {
                        var r = i.parentElement
                          , l = r.previousSibling
                          , c = r.nextSibling;
                        n.isHighlight(r) && (a(r, i) ? (r.replaceChild(i.firstChild, i),
                        t[o] = r,
                        e = !0) : (i.nextSibling || (s(i).insertBefore(c || r),
                        e = !0),
                        i.previousSibling || (s(i).insertAfter(l || r),
                        e = !0),
                        r.hasChildNodes() || s(r).remove()))
                    }),
                    e
                }
                l(t, !0);
                do {
                    e = i()
                } while (e)
            }
            ,
            c.prototype.mergeSiblingHighlights = function(t) {
                var e = this;
                function n(t, n) {
                    return n && n.nodeType === i.ELEMENT_NODE && a(t, n) && e.isHighlight(n)
                }
                t.forEach(function(t) {
                    var e = t.previousSibling
                      , i = t.nextSibling;
                    n(t, e) && (s(t).prepend(e.childNodes),
                    s(e).remove()),
                    n(t, i) && (s(t).append(i.childNodes),
                    s(i).remove()),
                    s(t).normalizeTextNodes()
                })
            }
            ,
            c.prototype.setColor = function(t) {
                this.options.color = t
            }
            ,
            c.prototype.getColor = function() {
                return this.options.color
            }
            ,
            c.prototype.setUnderline = function(t) {
                this.options.underline = t
            }
            ,
            c.prototype.getUnderline = function() {
                return this.options.underline
            }
            ,
            c.prototype.setCrossed = function(t) {
                this.options.crossed = t
            }
            ,
            c.prototype.getCrossed = function() {
                return this.options.crossed
            }
            ,
            c.prototype.removeHighlights = function(t) {
                var e = t || this.el
                  , n = this.getHighlights({
                    container: e
                })
                  , o = this;
                function a(t) {
                    s(t).unwrap().forEach(function(t) {
                        var e, n, o;
                        n = (e = t).previousSibling,
                        o = e.nextSibling,
                        n && n.nodeType === i.TEXT_NODE && (e.nodeValue = n.nodeValue + e.nodeValue,
                        s(n).remove()),
                        o && o.nodeType === i.TEXT_NODE && (e.nodeValue = e.nodeValue + o.nodeValue,
                        s(o).remove())
                    })
                }
                l(n, !0),
                n.forEach(function(t) {
                    !0 === o.options.onRemoveHighlight(t) && a(t)
                })
            }
            ,
            c.prototype.getHighlights = function(t) {
                var i = (t = r(t, {
                    container: this.el,
                    andSelf: !0,
                    grouped: !1
                })).container.querySelectorAll("[" + e + "]")
                  , o = Array.prototype.slice.call(i);
                return !0 === t.andSelf && t.container.hasAttribute(e) && o.push(t.container),
                t.grouped && (o = function(t) {
                    var e = []
                      , i = {}
                      , o = [];
                    return t.forEach(function(t) {
                        var o = t.getAttribute(n);
                        void 0 === i[o] && (i[o] = [],
                        e.push(o)),
                        i[o].push(t)
                    }),
                    e.forEach(function(t) {
                        var e = i[t];
                        o.push({
                            chunks: e,
                            timestamp: t,
                            toString: function() {
                                return e.map(function(t) {
                                    return t.textContent
                                }).join("")
                            }
                        })
                    }),
                    o
                }(o)),
                o
            }
            ,
            c.prototype.isHighlight = function(t) {
                return t && t.nodeType === i.ELEMENT_NODE && t.hasAttribute(e)
            }
            ,
            c.prototype.serializeHighlights = function() {
                var t = this.getHighlights()
                  , e = this.el
                  , n = [];
                return l(t, !1),
                t.forEach(function(t) {
                    var o = 0
                      , a = t.textContent.length
                      , r = function(t, e) {
                        var n, i = [];
                        do {
                            n = Array.prototype.slice.call(t.parentNode.childNodes),
                            i.unshift(n.indexOf(t)),
                            t = t.parentNode
                        } while (t !== e || !t);
                        return i
                    }(t, e)
                      , l = t.cloneNode(!0);
                    l.innerHTML = "",
                    l = l.outerHTML,
                    t.previousSibling && t.previousSibling.nodeType === i.TEXT_NODE && (o = t.previousSibling.length),
                    n.push([l, t.textContent, r.join(":"), o, a])
                }),
                JSON.stringify(n)
            }
            ,
            c.prototype.deserializeHighlights = function(t) {
                var e, n = [], o = this;
                if (!t)
                    return n;
                try {
                    e = JSON.parse(t)
                } catch (t) {
                    throw "Can't parse JSON: " + t
                }
                return e.forEach(function(t) {
                    try {
                        !function(t) {
                            for (var e, a, r, l = {
                                wrapper: t[0],
                                text: t[1],
                                path: t[2].split(":"),
                                offset: t[3],
                                length: t[4]
                            }, c = l.path.pop(), d = o.el; r = l.path.shift(); )
                                d = d.childNodes[r];
                            d.childNodes[c - 1] && d.childNodes[c - 1].nodeType === i.TEXT_NODE && (c -= 1),
                            (e = (d = d.childNodes[c]).splitText(l.offset)).splitText(l.length),
                            e.nextSibling && !e.nextSibling.nodeValue && s(e.nextSibling).remove(),
                            e.previousSibling && !e.previousSibling.nodeValue && s(e.previousSibling).remove(),
                            a = s(e).wrap(s().fromHTML(l.wrapper)[0]),
                            n.push(a)
                        }(t)
                    } catch (t) {
                        console && console.warn
                    }
                }),
                n
            }
            ,
            c.prototype.find = function(t, e) {
                var n = s(this.el).getWindow()
                  , i = n.scrollX
                  , o = n.scrollY
                  , a = void 0 === e || e;
                if (s(this.el).removeAllRanges(),
                n.find)
                    for (; n.find(t, a); )
                        this.doHighlight(!0);
                else if (n.document.body.createTextRange) {
                    var r = n.document.body.createTextRange();
                    for (r.moveToElementText(this.el); r.findText(t, 1, a ? 4 : 0) && (s(this.el).contains(r.parentElement()) || r.parentElement() === this.el); )
                        r.select(),
                        this.doHighlight(!0),
                        r.collapse(!1)
                }
                s(this.el).removeAllRanges(),
                n.scrollTo(i, o)
            }
            ,
            c.createWrapper = function(t) {
                var e = document.createElement("span");
                return e.style.backgroundColor = t.color,
                e.style.borderBottom = t.underline,
                e.style.textDecoration = t.crossed,
                e.className = t.highlightedClass,
                e
            }
            ,
            t.TextHighlighter = c
        }(window)
    },
    217: function(t, e) {},
    22: function(t, e, n) {
        "use strict";
        function i(t) {
            var e = t;
            return e = (e = (e = (e = e.replace(/&/g, "&amp;")).replace(/</g, "&lt;")).replace(/>/g, "&gt;")).replace(/"/g, "&quot;")
        }
        function o(t, e) {
            for (var n = new Object, i = new Object, o = 0; o < e.length; o++)
                null == n[e[o]] && (n[e[o]] = {
                    rows: new Array,
                    o: null
                }),
                n[e[o]].rows.push(o);
            for (o = 0; o < t.length; o++)
                null == i[t[o]] && (i[t[o]] = {
                    rows: new Array,
                    n: null
                }),
                i[t[o]].rows.push(o);
            for (var o in n)
                1 == n[o].rows.length && void 0 !== i[o] && 1 == i[o].rows.length && (e[n[o].rows[0]] = {
                    text: e[n[o].rows[0]],
                    row: i[o].rows[0]
                },
                t[i[o].rows[0]] = {
                    text: t[i[o].rows[0]],
                    row: n[o].rows[0]
                });
            for (o = 0; o < e.length - 1; o++)
                null != e[o].text && null == e[o + 1].text && e[o].row + 1 < t.length && null == t[e[o].row + 1].text && e[o + 1] == t[e[o].row + 1] && (e[o + 1] = {
                    text: e[o + 1],
                    row: e[o].row + 1
                },
                t[e[o].row + 1] = {
                    text: t[e[o].row + 1],
                    row: o + 1
                });
            for (o = e.length - 1; o > 0; o--)
                null != e[o].text && null == e[o - 1].text && e[o].row > 0 && null == t[e[o].row - 1].text && e[o - 1] == t[e[o].row - 1] && (e[o - 1] = {
                    text: e[o - 1],
                    row: e[o].row - 1
                },
                t[e[o].row - 1] = {
                    text: t[e[o].row - 1],
                    row: o - 1
                });
            return {
                o: t,
                n: e
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.diffString = function(t, e) {
            t = t.replace(/\s+$/, ""),
            e = e.replace(/\s+$/, "");
            var n = o("" == t ? [] : t.split(/\s+/), "" == e ? [] : e.split(/\s+/))
              , a = ""
              , r = t.match(/\s+/g);
            null == r ? r = ["\n"] : r.push("\n");
            var l = e.match(/\s+/g);
            if (null == l ? l = ["\n"] : l.push("\n"),
            0 == n.n.length)
                for (var s = 0; s < n.o.length; s++)
                    a += "<del>" + i(n.o[s]) + r[s] + "</del>";
            else {
                if (null == n.n[0].text)
                    for (e = 0; e < n.o.length && null == n.o[e].text; e++)
                        a += "<del>" + i(n.o[e]) + r[e] + "</del>";
                for (s = 0; s < n.n.length; s++)
                    if (null == n.n[s].text)
                        a += "<ins>" + i(n.n[s]) + l[s] + "</ins>";
                    else {
                        var c = "";
                        for (e = n.n[s].row + 1; e < n.o.length && null == n.o[e].text; e++)
                            c += "<del>" + i(n.o[e]) + r[e] + "</del>";
                        a += " <text>" + n.n[s].text + "</text>" + l[s] + c
                    }
            }
            return a
        }
        ,
        e.diffString2 = function(t, e) {
            t = t.replace(/\s+$/, ""),
            e = e.replace(/\s+$/, "");
            var n = o("" == t ? [] : t.split(/\s+/), "" == e ? [] : e.split(/\s+/))
              , a = t.match(/\s+/g);
            null == a ? a = ["\n"] : a.push("\n");
            var r = e.match(/\s+/g);
            null == r ? r = ["\n"] : r.push("\n");
            for (var l = "", s = new Array, c = 0; c < n.o.length; c++)
                s[c] = "rgb(" + 100 * Math.random() + "%, " + 100 * Math.random() + "%, " + 100 * Math.random() + "%)",
                null != n.o[c].text ? l += '<span style="background-color: ' + s[c] + '"><text>' + i(n.o[c].text) + "</text>" + a[c] + "</span>" : l += "<del>" + i(n.o[c]) + a[c] + "</del>";
            var d = "";
            for (c = 0; c < n.n.length; c++)
                null != n.n[c].text ? d += '<span style="background-color: ' + s[n.n[c].row] + '"><text>' + i(n.n[c].text) + "</text>" + r[c] + "</span>" : d += "<ins>" + i(n.n[c]) + r[c] + "</ins>";
            return {
                o: l,
                n: d
            }
        }
        ,
        e.diffString3 = function(t, e, n) {
            t = t.replace(/\s+$/, ""),
            e = e.replace(/\s+$/, ""),
            n = n.replace(/\s+$/, "");
            var a = t.toLowerCase()
              , r = n.toLowerCase()
              , l = o("" == t ? [] : t.split(/\s+/), "" == e ? [] : e.split(/\s+/))
              , s = o("" == a ? [] : a.split(/\s+/), "" == r ? [] : r.split(/\s+/));
            l.co = s.o,
            l.cr = s.n;
            var c = ""
              , d = t.match(/\s+/g);
            null == d ? d = ["\n"] : d.push("\n");
            var h = e.match(/\s+/g);
            if (null == h ? h = ["\n"] : h.push("\n"),
            0 == l.n.length)
                for (var u = 0; u < l.o.length; u++) {
                    var f = "<del>" + i(l.o[u]) + d[u] + "</del>";
                    null == l.co[u].text && (f = "<pron>" + f + "</pron>"),
                    c += f
                }
            else {
                if (null == l.n[0].text)
                    for (e = 0; e < l.o.length && null == l.o[e].text; e++)
                        f = "<del>" + i(l.o[e]) + d[e] + "</del>",
                        null == l.co[e].text && (f = "<pron>" + f + "</pron>"),
                        c += f;
                for (u = 0; u < l.n.length; u++)
                    if (null == l.n[u].text)
                        c += "<ins>" + i(l.n[u]) + h[u] + "</ins>";
                    else {
                        var g = "";
                        for (e = l.n[u].row + 1; e < l.o.length && null == l.o[e].text; e++)
                            f = "<del>" + i(l.o[e]) + d[e] + "</del>",
                            null == l.co[e].text && (f = "<pron>" + f + "</pron>"),
                            g += f;
                        f = "<text>" + l.n[u].text + "</text>",
                        null == l.co[l.n[u].row].text && (f = "<pron>" + f + "</pron>"),
                        c += " " + f + h[u] + g
                    }
            }
            return c
        }
    },
    54: function(t, e, n) {
        n(55),
        t.exports = n(217)
    },
    55: function(t, e, n) {
        "use strict";
        n(56),
        n(215)
    },
    56: function(t, e, n) {
        "use strict";
        (function(t, e) {
            var i = p(n(57))
              , o = function(t) {
                if (t && t.__esModule)
                    return t;
                var e = {};
                if (null != t)
                    for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e.default = t,
                e
            }(n(87))
              , a = p(n(93));
            n(94);
            var r = p(n(95))
              , l = p(n(36))
              , s = p(n(98))
              , c = p(n(99))
              , d = n(100)
              , h = p(n(110))
              , u = n(0);
            n(196);
            var f = p(n(197));
            p(n(201));
            n(202),
            n(203);
            var g = n(22);
            function p(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            n(211),
            n(212),
            n(213),
            n(214),
            window.StickySidebar = c.default,
            window.ResizeSensor = s.default,
            e.jQuery = e.$ = window.$ = t,
            window.jspreadsheet = l.default,
            window.uuidv4 = d.v4,
            window.Swiper = h.default,
            window.Plyr = a.default,
            window.iFrameResize = iFrameResize,
            t(document).on("click", ".notification > button.delete", function() {
                return t(this).parent().addClass("is-hidden"),
                !1
            }),
            t.ajaxSetup({
                beforeSend: function(t, e) {
                    /^(GET|HEAD|OPTIONS|TRACE)$/i.test(e.type) || this.crossDomain || t.setRequestHeader("X-CSRFToken", window.csrf_token)
                }
            }),
            t.valHooks.textarea = {
                get: function(t) {
                    return t.value.replace(/\r?\n/g, "\r\n")
                }
            };
            function m(t, e, n) {
                var i = new RegExp("([?&])" + e + "=.*?(&|$)","i")
                  , o = -1 !== t.indexOf("?") ? "&" : "?";
                return t.match(i) ? t.replace(i, "$1" + e + "=" + n + "$2") : t + o + e + "=" + n
            }
            window.generate_qs = function(t) {
                var e = [];
                for (var n in t)
                    n && t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                return e.join("&")
            }
            ,
            window.mobileAndTabletCheck = function() {
                var t, e = !1;
                return t = navigator.userAgent || navigator.vendor || window.opera,
                (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0),
                e
            }
            ,
            window.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            var v = function(e, n, o, a, r, l) {
                null !== a && void 0 !== a || (a = function(t, e) {
                    return null != e && alert(e.responseText),
                    !1
                }
                );
                r = void 0 === r || null === r ? {} : r;
                var s = {
                    url: e,
                    type: n,
                    data: o = o || {},
                    headers: r,
                    success: function(t) {
                        a(t, null)
                    },
                    error: function(t) {
                        a(null, t)
                    }
                };
                if ("object" === (void 0 === o ? "undefined" : (0,
                i.default)(o)))
                    try {
                        s.data = t.param(o, !0)
                    } catch (t) {
                        s.processData = !1,
                        s.contentType = !1
                    }
                !0 === l && (s.contentType = "application/json",
                s.dataType = "json",
                s.data = JSON.stringify(o)),
                t.ajax(s)
            };
            window.split_sentences = function(t) {
                return f.default.sentences(t, {
                    newline_boundaries: !1,
                    html_boundaries: !1,
                    sanitize: !0,
                    allowed_tags: !1,
                    preserve_whitespace: !1,
                    abbreviations: null
                })
            }
            ,
            window.load_jqform = function(e, n) {
                var i = e.getAttribute("data-jqform")
                  , o = JSON.parse(i.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f").replace(/[\u0000-\u0019]+/g, ""))
                  , a = t(n);
                for (var r in o)
                    if (o.hasOwnProperty(r)) {
                        var l = o[r];
                        a.find('[name="' + r + '"]').val(l)
                    }
            }
            ,
            window.load_jqdiv = function(e, n, i) {
                t(e).attr(n, i)
            }
            ,
            window.load_jqhtml = function(e, n, i, o, a, r, l) {
                var s = t(e)
                  , c = (o = s.attr("data-href") || o,
                null)
                  , d = "true" == s.attr("no-jqform");
                a = a || !1,
                r = r || null;
                o && ((c = n ? t(n) : s).html(""),
                r && c.closest(".modal").one("callback", r),
                t.get(o, function(e) {
                    var n = t(e);
                    c.html(n),
                    l && l(),
                    d || n.find("form").addClass("jqform"),
                    a && n.find("form").attr("data-noreload", "true"),
                    i && (0,
                    u.each)(i, function(t, e) {
                        n.find("form").attr(t, e)
                    }),
                    n.find(".ckeditor").length && CKEDITOR.replaceAll("ckeditor"),
                    n.find(".django-ckeditor").length && initialiseCKEditor(".django-ckeditor"),
                    n.find(".ckeditoruploadingwidget").length && initialiseCKEditor(".ckeditoruploadingwidget"),
                    n.find(".jqhtml-loader").length && n.find(".jqhtml-loader").each(function(t, e) {
                        load_jqhtml(e)
                    })
                }))
            }
            ,
            window.load_jqiframe = function(e, n, i) {
                var o = t(e)
                  , a = o.attr("data-href");
                a && (n ? t(n) : o).html('\n        <iframe class="modal-iframe" src="' + a + '">\n    ')
            }
            ,
            window.load_jqiframe_src = function(e, n, i) {
                var o = t(e)
                  , a = o.attr("data-href");
                a && (n ? t(n) : o).attr("src", a)
            }
            ,
            window.load_players = function() {
                t(".post-video-item").each(function(t) {
                    if (!("true" == this.getAttribute("loaded"))) {
                        var e = new a.default(this,{
                            tooltips: {
                                controls: !0
                            },
                            captions: {
                                language: "vi"
                            },
                            youtube: {
                                vq: 1080,
                                hd: 1,
                                width: 1920,
                                height: 1080,
                                rel: 0,
                                showinfo: 0
                            },
                            speed: {
                                selected: 1,
                                options: [.5, .8, .9, 1, 1.1, 1.25, 1.5, 1.75, 2, 4]
                            }
                        });
                        window.players[e.id] = e,
                        e.on("ready", function() {
                            e.embed.setSize(1920, 1080),
                            e.embed.setOption("captions", "track", {
                                languageCode: "vi"
                            })
                        })
                    }
                }),
                t(document).arrive(".post-audio-item", {
                    existing: !0
                }, function(e) {
                    t(e);
                    if (!("true" == this.getAttribute("loaded"))) {
                        var n = "true" === this.getAttribute("no-extra-controls")
                          , i = "true" === this.getAttribute("data-showdownload")
                          , o = new a.default(this,{
                            tooltips: {
                                controls: !0
                            },
                            speed: {
                                selected: 1,
                                options: [.5, .8, .9, 1, 1.1, 1.25, 1.5, 1.75, 2, 4]
                            }
                        });
                        window.players[e.id || o.id] = o;
                        var r = t(o.elements.settings.popup)
                          , l = t(o.media);
                        if (n)
                            return;
                        r.find('[role="menu"]').append('\n                <button data-plyr="reload" type="button" class="plyr__control"><span>Reload File</span></button>\n            '),
                        i && r.find('[role="menu"]').append('\n                    <a data-plyr="download" type="button" class="plyr__control" download target="_blank" href="' + o.download + '"><span>Download</span></a>\n                '),
                        r.on("click", '[data-plyr="reload"]', function() {
                            l.find("source").length ? l.find("source").attr("src", m(o.source, "v", "" + (new Date).getTime())) : l.attr("src", m(o.source, "v", "" + (new Date).getTime())),
                            l[0].load()
                        })
                    }
                })
            }
            ;
            window.topFunction = function() {
                document.body.scrollTop = 0,
                document.documentElement.scrollTop = 0
            }
            ,
            window.startTimer = function(t, e, n) {
                var i, o, a = 60 * t, r = setInterval(function() {
                    i = parseInt(a / 60, 10),
                    o = parseInt(a % 60, 10),
                    i = i < 10 ? "0" + i : i,
                    o = o < 10 ? "0" + o : o,
                    e.textContent = i + ":" + o,
                    e.setAttribute("data-timeleft-value", a / 60),
                    a <= 5 && e.classList.add("danger"),
                    --a < 0 && (clearInterval(r),
                    n && n())
                }, 1e3);
                return r
            }
            ,
            window.startStopwatch = function(t) {
                var e = Date.now();
                return t.textContent = "00:00",
                setInterval(function() {
                    var n = Date.now() - e
                      , i = parseInt(n / 1e3 / 60)
                      , o = parseInt(n / 1e3 % 60);
                    i = i < 10 ? "0" + i : i,
                    o = o < 10 ? "0" + o : o,
                    t.textContent = i + ":" + o
                }, 1e3)
            }
            ,
            window.add_jqcheckbox = function(e) {
                var n = t(e)
                  , i = n.closest(".jqinputs-search")
                  , o = i.attr("data-key")
                  , a = "true" == i.attr("data-selectone")
                  , r = i.find(".jqinputs-search-checkboxes")
                  , l = n.attr("data-id")
                  , s = n.attr("data-name")
                  , c = s + "-" + l;
                a ? r.html('\n        <div class="form-check">\n            <input class="form-check-input" type="checkbox" name="' + o + "\" value='" + l + "' id=\"" + c + '">\n            <label class="form-check-label" for="' + c + '">' + s + "</label>\n        </div>\n        ") : r.append('\n        <div class="form-check">\n            <input class="form-check-input" type="checkbox" name="' + o + "\" value='" + l + "' id=\"" + c + '">\n            <label class="form-check-label" for="' + c + '">' + s + "</label>\n        </div>\n        ")
            }
            ,
            window.previous_page = function(t) {
                1 === history.length ? window.location = t || "/" : history.back()
            }
            ,
            window.socialproof = function() {
                var e = t(".jqsocialproof");
                if (e.length) {
                    var n = e.attr("data-href");
                    setTimeout(function t() {
                        v(n, "GET", null, function(n, i) {
                            n && !i && (e.html(n),
                            e.fadeIn(350),
                            setTimeout(function() {
                                e.fadeOut(500);
                                var n, i, o = 1e3 * (n = 15,
                                i = 35,
                                Math.random() * (i - n) + n);
                                setTimeout(t, o)
                            }, 4e3))
                        })
                    }, 8e3)
                }
            }
            ,
            window.getYoutubeId = function(t) {
                var e = t.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                return e && 11 === e[2].length ? e[2] : null
            }
            ,
            t(function() {
                var e;
                e = {},
                t("h1, h2, h3, h4, h5, h6, h7").each(function(t) {
                    var n = this.id ? this.id : this.textContent.trim().toLowerCase().split(" ").join("-").replace(/[!@#$%^&*():]/gi, "").replace(/\//gi, "-");
                    e[n] = isNaN(e[n]) ? 0 : ++e[n],
                    e[n] ? this.id = n + "-" + e[n] : this.id = n
                }),
                o.init({
                    tocSelector: ".js-toc",
                    contentSelector: ".js-toc-content",
                    headingSelector: "h1, h2, h3",
                    hasInnerContainers: !0,
                    disableTocScrollSync: !1,
                    scrollSmooth: !1
                }),
                document.querySelectorAll("form").forEach(function(t) {
                    t.classList.contains("form-prevent-doubleclick") && t.addEventListener("submit", function(e) {
                        t.classList.contains("is-submitting") && e.preventDefault(),
                        t.classList.add("is-submitting")
                    })
                }),
                t(document).arrive("form", function() {
                    var e = t(this)[0];
                    e.classList.contains("form-prevent-doubleclick") && e.addEventListener("submit", function(t) {
                        e.classList.contains("is-submitting") && t.preventDefault(),
                        e.classList.add("is-submitting")
                    })
                }),
                t.each(t(".resized-iframe"), function(t, e) {
                    iFrameResize({
                        autoresize: !0,
                        log: !1,
                        checkOrigin: !1,
                        heightCalculationMethod: "documentElementScroll"
                    }, e)
                }),
                window.players = {},
                window.load_players(),
                t('[data-toggle="tooltip"]').tooltip(),
                t(document).on("click", ".dropdown-menu.no-toggle", function(t) {
                    t.stopPropagation()
                }),
                t(document).on("click", ".jqinline-form-form-btn", function() {
                    var e = t(this)
                      , n = e.closest(".jqinline-form")
                      , i = n.find(".jqinline-form-save-btn")
                      , o = n.find(".jqinline-form-result")
                      , a = n.attr("data-form-url");
                    e.hide(),
                    i.show(),
                    load_jqhtml(o[0], null, null, a, null)
                }),
                t(document).on("click", ".jqinline-form-save-btn", function() {
                    var e = t(this)
                      , n = e.closest(".jqinline-form")
                      , i = n.find(".jqinline-form-form-btn")
                      , o = n.find(".jqinline-form-result").attr("id")
                      , a = n.attr("data-result-url");
                    e.hide(),
                    i.show();
                    var r = n.find("form");
                    r.length && (r.addClass("jqform"),
                    r.attr("data-reload-html", "#" + o),
                    r.attr("data-reload-html-url", a),
                    r.submit())
                });
                var n;
                window.params = decodeURIComponent(n || document.location.search).replace(/(^\?)/, "").replace(/\+/g, " ").split("&").map(function(t) {
                    return this[(t = t.split("="))[0]] = t[1],
                    this
                }
                .bind({}))[0];
                if ((document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) && document.getElementById("site-scrollTop") && (document.getElementById("site-scrollTop").style.display = "block"),
                t(document).on("click", ".question-ordering-item", function() {
                    var e = t(this)
                      , n = e.parents(".question-wrapper").find("input");
                    if (!n.attr("readonly")) {
                        var i = e.text()
                          , o = n.attr("data-txt") || "";
                        try {
                            i = /\[([^\]]+)\]/g.exec(i)[1]
                        } catch (t) {
                            i = null
                        }
                        if (i) {
                            var a = "--" + i + "--";
                            -1 != o.indexOf(a) ? (o = o.replaceAll(a, ""),
                            e.removeClass("selected")) : (e.addClass("selected"),
                            o = o += a),
                            n.attr("data-txt", o),
                            n.val(o.replaceAll("--", "")),
                            n.change()
                        }
                    }
                }),
                t(".jqselect-conditional").length) {
                    var i = t(".jqselect-conditional");
                    t.each(i, function(e, n) {
                        var i = t(n)
                          , o = t('select[name="' + i.attr("data-depend") + '"]')
                          , a = JSON.parse(i.find('script[name="data-choices"]').html());
                        if (o.length) {
                            var r = i.attr("data-selected")
                              , l = o.val()
                              , s = a[l];
                            if (s)
                                for (var c = 0; c < s.length; c++) {
                                    var d = s[c];
                                    "" != r && d[0] == r ? i.append("<option selected value=" + d[0] + ">" + d[1] + "</option>") : i.append("<option value=" + d[0] + ">" + d[1] + "</option>")
                                }
                            o.on("change", function() {
                                i.find("option").remove();
                                var t = o.val()
                                  , e = a[t];
                                if (e)
                                    for (var n = 0; n < e.length; n++) {
                                        var r = e[n];
                                        i.append("<option value=" + r[0] + ">" + r[1] + "</option>")
                                    }
                            })
                        }
                    })
                }
                t(".jqcarousel").on("click", ".jqcarousel-thumbnail", function(e) {
                    e.preventDefault();
                    var n = t(this);
                    if (n.hasClass("active"))
                        return !1;
                    var i = n.closest(".jqcarousel")
                      , o = i.find(".jqcarousel-main a")
                      , a = i.find("img:first")
                      , r = this.getAttribute("data-url")
                      , l = this.getAttribute("data-fullurl")
                      , s = i.find(".jqlightbox-link");
                    return i.find(".jqcarousel-thumbnail").removeClass("active"),
                    n.addClass("active"),
                    a.attr("src", r),
                    o.attr("href", l),
                    s.attr("href", l),
                    e.stopPropagation(),
                    !1
                }),
                t(".jqcarousel-control").on("click", function(e) {
                    e.preventDefault();
                    var n = t(this)
                      , i = this.getAttribute("data-direction")
                      , o = n.closest(".jqcarousel")
                      , a = o.find(".jqcarousel-thumbnail")
                      , r = o.find(".jqlightbox-link")
                      , l = a.filter(".active");
                    if ("right" === i)
                        var s = l.next();
                    else
                        s = l.prev();
                    if (!s.length)
                        return !1;
                    a.removeClass("active");
                    var c = s[0].getAttribute("data-url")
                      , d = s[0].getAttribute("data-fullurl");
                    return o.find("img:first").attr("src", c),
                    s.addClass("active"),
                    r.attr("href", d),
                    e.stopPropagation(),
                    !1
                });
                try {
                    window.lightbox_links = t(".jqlightbox .jqlightbox-link").simpleLightbox({
                        loadingTimeout: 10
                    })
                } catch (t) {
                    window.lightbox_links = null
                }
                try {
                    window.carousel_lightbox_links = t(".jqlightbox-carousel .jqlightbox-link").simpleLightbox({
                        loadingTimeout: 10,
                        history: !1,
                        loop: !1,
                        enableKeyboard: !0
                    })
                } catch (t) {
                    window.carousel_lightbox_links = null
                }
                window.lazy = new r.default({
                    elements_selector: ".lazyel",
                    class_loading: "is_loading",
                    threshold: 400,
                    callback_finish: function() {},
                    callback_load: function() {}
                }),
                t(document).on("submit", ".jqform", function(e) {
                    var n = t(this);
                    if ("true" == n.attr("data-submitting"))
                        return e.preventDefault(),
                        !1;
                    e.preventDefault();
                    var i = t(n.attr("data-reload-html"))
                      , o = n.attr("data-reload-html-url")
                      , a = t(n.attr("data-success-modal"))
                      , r = void 0 != n.attr("data-noreload")
                      , l = n.attr("error-txt") || "error";
                    return n.attr("data-submitting", "true"),
                    t.ajax({
                        type: n.attr("method"),
                        url: n.attr("action"),
                        data: new FormData(n[0]),
                        processData: !1,
                        contentType: !1,
                        success: function(t, l, s) {
                            var c = n.closest(".modal");
                            c.trigger("callback", [t]),
                            n[0].reset(),
                            n.attr("data-submitting", !1),
                            a.length ? (c.modal("hide"),
                            a.find(".modal-body").html(t),
                            a.modal("show")) : i.length ? (c.modal("hide"),
                            load_jqhtml(i[0], null, null, o)) : r ? c.modal("hide") : t.redirect ? window.location.href = t.redirect : location.reload(!0),
                            e.stopPropagation()
                        },
                        error: function(t, i, o) {
                            n.closest(".modal").modal("hide");
                            var a = l;
                            try {
                                a = JSON.parse(t.responseText).message
                            } catch (t) {}
                            setTimeout(function() {
                                alert(a)
                            }, 300),
                            e.stopPropagation()
                        }
                    }),
                    !1
                }),
                t(document).on("click", ".jqaction-link", function(e) {
                    if (e.preventDefault(),
                    window.current_user.is_authenticated) {
                        var n = t(this)
                          , i = this.getAttribute("data-href")
                          , o = this.getAttribute("data-redirect_url") || window.location.href
                          , a = this.getAttribute("data-confirm_text")
                          , r = "true" == this.getAttribute("data-reload_parent")
                          , l = t(n.attr("data-reload-html"))
                          , s = this.getAttribute("data-cls")
                          , c = this.getAttribute("data-text");
                        if (a && !confirm(a))
                            return !1;
                        v(i, "POST", null, function(t, e) {
                            if (null != e)
                                return !1;
                            parent.location && r && parent.location.reload();
                            var i = !0;
                            s && (n.toggleClass(s),
                            i = !1),
                            c && (n.text(c),
                            i = !1),
                            l.length && (load_jqhtml(l[0]),
                            i = !1),
                            i && (location.href = o)
                        })
                    } else
                        location.href = "/login?next=" + encodeURIComponent(location.href);
                    return e.stopPropagation(),
                    !1
                }),
                t(document).on("keypress", '.jqinputs-search input[type="text"]', function(e) {
                    if (13 == e.which) {
                        var n = t(this)
                          , i = n.parent().find(".jqinputs-search-output")
                          , o = n.attr("data-url")
                          , a = {};
                        return a[n.attr("data-field")] = n.val(),
                        t.ajax({
                            url: o,
                            data: a,
                            method: "GET",
                            success: function(t) {
                                return i.html(t),
                                !1
                            }
                        }),
                        e.stopPropagation(),
                        !1
                    }
                }),
                t(document).on("click", ".jqtoggle", function(e) {
                    e.preventDefault();
                    var n = t(this)
                      , i = t(this.getAttribute("data-target"))
                      , o = n.attr("data-toggle-class") || "is-toggled";
                    return i.hasClass(o) ? i.removeClass(o) : i.addClass(o),
                    !1
                }),
                t(document).on("click", ".jqtoggle-alt", function(e) {
                    e.preventDefault();
                    var n = t(this)
                      , i = t(this.getAttribute("data-target-alt"))
                      , o = n.attr("data-toggle-class") || "show";
                    return i.hasClass(o) ? i.removeClass(o) : i.addClass(o),
                    !1
                }),
                t(document).on("keyup", ".jqwordcount", function(e) {
                    var n = t(this);
                    if (!n.attr("data-norecount")) {
                        var i = [];
                        this.value.replace(/[\t\n\r\.\?\!]/gm, " ").split(" ").map(function(t) {
                            var e = t.trim();
                            e.length > 0 && i.push(e)
                        }),
                        n.siblings(".jqwordcount-show").text("Word count: " + i.length)
                    }
                }),
                t(".jqwordcount").each(function(e, n) {
                    var i = t(this)
                      , o = [];
                    (this.value || this.innerText).replace(/[\t\n\r\.\?\!]/gm, " ").split(" ").map(function(t) {
                        var e = t.trim();
                        e.length > 0 && o.push(e)
                    }),
                    i.siblings(".jqwordcount-show").text("Word count: " + o.length)
                }),
                t(".jqhtml-loader").each(function(t, e) {
                    load_jqhtml(e)
                }),
                t(".jqpolling").each(function(t, e) {
                    var n = parseInt(e.getAttribute("data-polling"));
                    setInterval(function() {
                        load_jqhtml(e)
                    }, 1e3 * n)
                }),
                t(".jqlink").on("click", function() {
                    var e = t(this).attr("data-href");
                    window.location = e
                }),
                t(document).on("click", ".flip-btn", function() {
                    t(this).parent().find(".flippable").toggleClass("flipme")
                }),
                t(document).on("click", ".flippable .flashcard-front", function(e) {
                    e.target === this && t(this).parent(".flippable").toggleClass("flipme")
                }),
                t(document).on("click", ".flippable .flashcard-back", function(e) {
                    t(this).parent(".flippable").toggleClass("flipme")
                }),
                t(document).on("click", ".flashcard-action", function() {
                    var e = t(this)
                      , n = e.attr("data-action")
                      , i = e.attr("data-href");
                    t.post(i, {
                        action: n
                    }, function() {
                        location.reload()
                    })
                }),
                t(document).on("click", ".flashcard-review-option", function() {
                    var e = t(this);
                    if (!e.hasClass("checked")) {
                        var n = e.attr("data-action")
                          , i = e.attr("data-href")
                          , o = e.attr("data-result");
                        e.find(".flashcard-review-option-number").replaceWith('<span class="flashcard-review-option-result ' + o + '"></span>'),
                        e.addClass("checked"),
                        e.addClass(o),
                        t.post(i, {
                            action: n
                        }, function() {
                            "correct" === o && setTimeout(function() {
                                location.reload()
                            }, 1e3)
                        })
                    }
                }),
                t(document).on("keypress", ".flashcard-review-input", function(e) {
                    if (13 == (e.keyCode || e.which)) {
                        var n = t(this);
                        if (n.removeClass("correct").removeClass("wrong"),
                        !n.val().trim())
                            return;
                        var i = n.attr("data-href")
                          , o = n.attr("data-answer").trim().toLowerCase() == n.val().trim().toLowerCase() ? 1 : 0
                          , a = 1 == o ? "correct" : "wrong";
                        n.addClass(a),
                        t.post(i, {
                            action: o
                        }, function() {
                            1 == o && setTimeout(function() {
                                location.reload()
                            }, 1e3)
                        })
                    }
                }),
                t(document).on("click", ".flashcard-review-showanswer", function() {
                    var e = t(this).parents(".flashcard-review-shortanswer").find(".flashcard-review-input")
                      , n = e.attr("data-href");
                    e.removeClass("correct").removeClass("wrong"),
                    e.val(e.attr("data-answer")),
                    e.addClass("answer"),
                    e.attr("disabled", "true"),
                    t.post(n, {
                        action: 0
                    }, function() {})
                }),
                t(document).on("click", ".flashcard-review-skip", function() {
                    location.reload()
                }),
                t(".inpage-nav .nav-link").on("click", function() {
                    var e = t(this);
                    e.closest(".nav").find(".nav-link").removeClass("active"),
                    e.addClass("active")
                }),
                t(document).on("click", ".jq-showmore", function() {
                    var e = t(this)
                      , n = e.attr("data-href")
                      , i = e.parent();
                    t.get(n, function(t) {
                        e.remove(),
                        i.fadeOut(150, function() {
                            i.html(i.html() + t),
                            i.fadeIn(200)
                        })
                    })
                }),
                window.jq_audio_item = new Audio,
                window.jq_audio_item.preload = "auto",
                t(document).on("click", ".jq-audio-btn", function() {
                    var e = t(this).parent(".jq-audio-player").find("audio")
                      , n = e.attr("data-text")
                      , i = e.attr("data-lang") || "en-US";
                    if (n && ("en-US" != i && "en-GB" != i)) {
                        var o = new SpeechSynthesisUtterance(n);
                        return o.lang = i,
                        o.rate = .9,
                        void window.speechSynthesis.speak(o)
                    }
                    var a = null;
                    try {
                        a = e.attr("src") || e.find("source").attr("src")
                    } catch (t) {
                        return
                    }
                    window.jq_audio_item.src != encodeURI(a) && (window.jq_audio_item.src = a,
                    window.jq_audio_item.load()),
                    window.jq_audio_item.play().then(function() {}).catch(function(t) {
                        e.find("source").length ? e.find("source").attr("src", m(a, "v", "" + (new Date).getTime())) : e.attr("src", m(a, "v", "" + (new Date).getTime()))
                    })
                });
                var a = t(".jq-sticky-header")
                  , l = a.length > 0 ? a.prev().height() + 90 : null;
                function s() {
                    var e = t(".jq-sticky-header");
                    e.length && (window.pageYOffset > l - 90 ? e.hasClass("sticky") || (e.addClass("sticky"),
                    e.parent().addClass("with-sticky")) : e.hasClass("sticky") && (e.parent().removeClass("with-sticky"),
                    e.removeClass("sticky"),
                    e.find(".nav-link").removeClass("active"),
                    e.find(".nav-link:first").addClass("active"),
                    history.replaceState(null, null, " ")))
                }
                s(),
                window.onscroll = function() {
                    s(),
                    document.getElementById("site-scrollTop") && (document.body.scrollTop > 100 || document.documentElement.scrollTop && document.documentElement.scrollTop > 100 ? document.getElementById("site-scrollTop").style.display = "flex" : document.getElementById("site-scrollTop").style.display = "none")
                }
                ,
                window.onresize = function() {
                    l = a.length > 0 ? a.prev().height() + 90 : null
                }
                ,
                function(e) {
                    t(".jqrecord-audio");
                    var n, i, o, a, r = window.URL || window.webkitURL, l = !1, s = !0, c = window.AudioContext || window.webkitAudioContext;
                    t(document).arrive(".jqtext-diff", {
                        existing: !0
                    }, function(e) {
                        var n = t(e)
                          , i = n.attr("data-old")
                          , o = n.attr("data-new");
                        n.html((0,
                        g.diffString)(i, o))
                    }),
                    t(document).arrive(".jqtext-rawdiff", {
                        existing: !0
                    }, function(e) {
                        var n = t(e)
                          , i = n.attr("data-old")
                          , o = n.attr("data-new")
                          , a = n.attr("data-raw");
                        n.html((0,
                        g.diffString3)(i, o, a))
                    }),
                    t(document).arrive(".jqrecord-audio", {
                        existing: !0
                    }, function(e) {
                        var h = t(e);
                        h.on("click", ".jqrecord-audio-start", function() {
                            if (!l) {
                                var e = t(this);
                                if (!e.hasClass("disabled")) {
                                    var h = e.siblings(".jqrecord-audio-stop")
                                      , u = e.closest(".jqrecord-audio")
                                      , f = e.siblings(".jqrecord-timer")
                                      , g = 0;
                                    try {
                                        g = "true" == e.attr("data-limit_answer_time") ? parseFloat(e.attr("data-time_limit_minutes")) : 0
                                    } catch (t) {}
                                    e.hide(),
                                    h.show();
                                    var p = null;
                                    p = g ? window.startTimer(g, f[0], function() {
                                        h.click()
                                    }) : window.startStopwatch(f[0]),
                                    function(t) {
                                        if (l)
                                            return;
                                        l = !0;
                                        navigator.mediaDevices.getUserMedia({
                                            audio: !0,
                                            video: !1
                                        }).then(function(e) {
                                            a = new c,
                                            n = e,
                                            o = a.createMediaStreamSource(e),
                                            (i = new WebAudioRecorder(o,{
                                                workerDir: "/static/js/webaudiorecorder/",
                                                encoding: "mp3",
                                                numChannels: 2,
                                                onEncoderLoading: function(t, e) {},
                                                onEncoderLoaded: function(t, e) {}
                                            })).onComplete = function(e, n) {
                                                l = !1;
                                                var i = r.createObjectURL(n)
                                                  , o = document.createElement("audio");
                                                if (o.controls = !0,
                                                o.src = i,
                                                o.className = "post-audio-item",
                                                t.find(".jqrecord-audio-start").removeClass("disabled"),
                                                t.find(".jqrecord-players").html(o),
                                                t.find("input.jqrecord-audio-file-input").length) {
                                                    var a = new File([n],(0,
                                                    d.v4)() + ".mp3")
                                                      , s = new DataTransfer;
                                                    s.items.add(a),
                                                    t.find("input.jqrecord-audio-file-input")[0].files = s.files,
                                                    t.find("input.jqrecord-audio-file-input").trigger("change")
                                                } else {
                                                    var c = new FileReader;
                                                    c.readAsDataURL(n),
                                                    c.onloadend = function() {
                                                        var e = c.result;
                                                        t.find("input.jqrecord-audio-base64-input").val(e).trigger("change")
                                                    }
                                                }
                                            }
                                            ,
                                            i.setOptions({
                                                timeLimit: 1200,
                                                encodeAfterRecord: s,
                                                ogg: {
                                                    quality: .5
                                                },
                                                mp3: {
                                                    bitRate: 32
                                                }
                                            }),
                                            i.startRecording()
                                        }).catch(function(t) {})
                                    }(u),
                                    h.one("click", function() {
                                        e.show().addClass("disabled"),
                                        u.find(".jqrecord-players").html("Processing..."),
                                        h.hide(),
                                        clearInterval(p),
                                        f.empty(),
                                        function(t) {
                                            if (!l)
                                                return;
                                            n.getAudioTracks()[0].stop(),
                                            i.finishRecording()
                                        }()
                                    })
                                }
                            }
                        })
                    })
                }(),
                window.dictionary = new function() {
                    var e = t(".jqdictionary-wrapper")
                      , n = t(".jqdictionary-show")
                      , i = t(".jqdictionary-close")
                      , o = t(".jqdictionary-expand")
                      , a = e.find(".jqdictionary-tab")
                      , r = e.find("iframe");
                    t(document).on("click", ".elevator-close", function() {
                        var e = t(this)
                          , n = e.parent(".site-elevator");
                        n.animate({
                            right: "-42px"
                        }, 200, function() {
                            n.find(".elevator-open").show()
                        })
                    }),
                    t(document).on("click", ".elevator-open", function() {
                        var e = t(this)
                          , n = e.parent(".site-elevator");
                        n.find(".elevator-open").hide(),
                        n.animate({
                            right: "0"
                        }, 200, function() {})
                    }),
                    n.on("click", function() {
                        r.attr("src") || r.attr("src", e.find(".jqdictionary-tab.active").attr("data-href")),
                        e.show()
                    }),
                    i.on("click", function() {
                        e.hide()
                    }),
                    o.on("click", function() {
                        e.toggleClass("expanded")
                    }),
                    t.extend(this, {
                        show: function() {
                            e.show()
                        }
                    }),
                    a.on("click", function() {
                        var n = t(this);
                        a.removeClass("active"),
                        n.addClass("active");
                        var i = n.attr("data-href");
                        e.find("iframe").attr("src", i),
                        r.fadeOut(30, function() {
                            setTimeout(function() {
                                r.fadeIn(100)
                            }, 650)
                        })
                    })
                }
                ,
                window.hltr = function(e) {
                    var n = !1
                      , i = null
                      , o = t("#highlight-toggle")
                      , a = t(".highlight-clear")
                      , r = t(".highlight-store")
                      , l = t(".highlight-storeditems")
                      , s = t(".highlight-top-controls");
                    s.length && s.on("click", ".highlight-color", function(e) {
                        e.preventDefault();
                        var n = t(this)
                          , i = n[0].className;
                        f.setColor(n.css("background-color")),
                        i.indexOf("underred") ? f.setUnderline(n.css("border-bottom")) : f.setUnderline(""),
                        i.indexOf("crossed") ? f.setCrossed(n.css("text-decoration")) : f.setCrossed("")
                    });
                    o.length && (n = o.is(":checked"));
                    function c() {
                        p.appendTo(t(".text-highlightable").first()),
                        t(".highlighted-note").off("click.highlight-remove").remove(),
                        window.hltr.removeHighlights()
                    }
                    function h() {
                        return p.appendTo(t(".text-highlightable").first()),
                        t(".highlighted-note").off("click.highlight-remove").remove(),
                        window.hltr.serializeHighlights()
                    }
                    function u(e) {
                        c(),
                        window.hltr.deserializeHighlights(e);
                        var n = t(".highlighted");
                        n.each(function(e, n) {
                            var i = n.getAttribute("data-uid")
                              , o = n.getAttribute("data-note");
                            if (!o || !i)
                                return !0;
                            var a = t(".highlighted[data-uid=" + i + "]")
                              , r = o.split("*|*")
                              , l = !0
                              , s = !1
                              , c = void 0;
                            try {
                                for (var d, h = r[Symbol.iterator](); !(l = (d = h.next()).done); l = !0) {
                                    var u = d.value;
                                    if (u) {
                                        var o = g.replace("{{txt}}", u)
                                          , f = t(o);
                                        a.last().append(f)
                                    }
                                }
                            } catch (t) {
                                s = !0,
                                c = t
                            } finally {
                                try {
                                    !l && h.return && h.return()
                                } finally {
                                    if (s)
                                        throw c
                                }
                            }
                            "true" == f.closest(".text-highlightable").attr("data-draggable") && f.draggable(),
                            f.one("click", ".highlighted-note-remove", function() {
                                a.removeAttr("data-note"),
                                f.remove()
                            }),
                            f.on("dblclick", function(t) {
                                "highlighted-note-remove" != t.target.className && (m(),
                                v(f))
                            })
                        })
                    }
                    o.on("change", function() {
                        n = o.is(":checked")
                    }),
                    a.on("click", function() {
                        confirm("Are you sure?") && c()
                    }),
                    r.on("click", function() {
                        var e = this.getAttribute("data-target")
                          , n = h();
                        return !(!n || !JSON.parse(n).length) && (t.post(e, {
                            data: n,
                            highlight_id: i
                        }, function(t) {
                            i = t.highlight_id,
                            u(n)
                        }).fail(function(t, e, n) {}),
                        {
                            data: n,
                            highlight_id: i
                        })
                    }),
                    l.on("change", function() {
                        var e = this.getAttribute("data-target")
                          , n = t(this).find("option:selected").val();
                        i != n && (i = n,
                        t.get(e, {
                            highlight_id: n
                        }, function(t) {
                            var e = t.data;
                            u(e)
                        }))
                    });
                    var f = new TextHighlighter(document.body,{
                        onBeforeHighlight: function(e) {
                            return !(!n && "always" != t(e.commonAncestorContainer).closest(".text-highlightable").attr("data-highlightable")) && (1 == t(e.commonAncestorContainer).closest(".text-highlightable").length && (!t(e.startContainer).hasClass("highlighted-note") && (p.appendTo(t(".text-highlightable").first()),
                            !0)))
                        },
                        onAfterHighlight: function(e, n) {
                            p.appendTo(t(".text-highlightable").first());
                            var i = (0,
                            d.v4)()
                              , o = null
                              , a = [];
                            n.map(function(e, n) {
                                var r = t(e);
                                if (r.parent().hasClass("highlighted-note")) {
                                    r.parent().parent(".highlighted");
                                    a.push(r.parent()),
                                    f.removeHighlights(r[0])
                                } else
                                    o = n,
                                    r.attr("data-uid", i)
                            });
                            var r = t(n[o])
                              , l = !0
                              , s = !1
                              , c = void 0;
                            try {
                                for (var h, u = a[Symbol.iterator](); !(l = (h = u.next()).done); l = !0) {
                                    var g = h.value
                                      , v = g.attr("data-uid");
                                    if (g.parent().attr("data-uid") !== v) {
                                        g.appendTo(r);
                                        var w = r.attr("data-note") || "";
                                        r.attr("data-note", w + "*|*" + g.text().trim())
                                    }
                                }
                            } catch (t) {
                                s = !0,
                                c = t
                            } finally {
                                try {
                                    !l && u.return && u.return()
                                } finally {
                                    if (s)
                                        throw c
                                }
                            }
                            return setTimeout(function() {
                                m(n[n.length - 1])
                            }, 100),
                            !0
                        },
                        onRemoveHighlight: function(e) {
                            p.appendTo(t(".text-highlightable").first()),
                            w();
                            var n = t(e);
                            return n.find(".highlighted-note").remove(),
                            n.text(n.text()),
                            !0
                        }
                    })
                      , g = "\n        <span class='highlighted-note'>\n            {{txt}}\n            <span class='highlighted-note-remove fal fa-times ml-1'></span>\n        </span>\n    "
                      , p = t(".highlight-control");
                    p.length || (t("body").append('\n        <div class="highlight-control">\n            <div>\n                <span class="fas fa-trash highlight-icon highlight-remove"></span>\n                <span class="fas fa-pencil highlight-icon highlight-note"></span>\n                <span class="highlight-icon highlight-color blue"></span>\n                <span class="highlight-icon highlight-color pink"></span>\n                <span class="highlight-icon highlight-color green"></span>\n                <span class="highlight-icon highlight-color yellow"></span>\n                <span class="highlight-icon highlight-color underred"></span>\n                <span class="highlight-icon highlight-color crossed">abc</span>\n                <span class="ml-2 fas fa-plus highlight-icon highlight-flashcard" data-toggle="modal" data-target="#highlight-modal"></span>\n            </div>\n            <div class="highlight-editor">\n                <textarea rows=3></textarea>\n                <div><span class="far fa-check highlight-icon highlight-save"></span></div>\n            </div>\n        </div>\n        <div class="modal" id="highlight-modal" tabindex="-1" aria-labelledby="highlight-modal" aria-hidden="true" data-keyboard="false" data-backdrop="static">\n            <div class="modal-dialog">\n                <div class="modal-content">\n                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n                        <span aria-hidden="true">&times;</span>\n                    </button>\n                    <div class="modal-body" id="highlight-modal-content"></div>\n                </div>\n            </div>\n        </div>\n    '),
                    p = t(".highlight-control"));
                    function m(e) {
                        var n = t(e);
                        p.attr("data-uid", n.attr("data-uid")),
                        n.find(".highlight-control").length ? p.show() : (p.appendTo(n),
                        p.css({
                            position: "absolute",
                            left: 0,
                            top: -35
                        }),
                        p.show())
                    }
                    function v(t) {
                        var t = t || null;
                        p.css({
                            top: -40
                        });
                        var e = p.find(".highlight-editor").show().find("textarea");
                        if (e.focus().val("").removeAttr("note-uid"),
                        t) {
                            e.val(t.text().trim());
                            var n = (0,
                            d.v4)();
                            t.attr("note-uid", n),
                            e.attr("note-uid", n)
                        }
                        p.find(".highlight-note").hide()
                    }
                    function w() {
                        p.hide(),
                        p.css({
                            top: -35
                        }),
                        p.find(".highlight-editor").hide(),
                        p.find(".highlight-note").show(),
                        p.find("textarea").val("")
                    }
                    return p.on("click", ".highlight-flashcard", function(e) {
                        var n = p.attr("data-uid");
                        if (n) {
                            e.preventDefault();
                            var i = t(".highlighted[data-uid=" + n + "]")
                              , o = [];
                            i.each(function(t, e) {
                                o.push(e.childNodes[0].nodeValue)
                            });
                            var a = i.last().attr("data-note") || p.find("textarea").val();
                            o = o.join(" ").trim(),
                            a = a.trim();
                            var r = i.last().attr("data-flashcard")
                              , l = "/flashcards/terms/create/?view=clean&term=" + o + "&definition=" + a + "&result=json";
                            r && "true" != r && (l = "/flashcards/terms/" + r + "/update/?view=clean&result=json"),
                            load_jqhtml(null, "#highlight-modal-content", null, l, !0, function(t, e) {
                                try {
                                    i.last().attr("data-flashcard", e.data.id)
                                } catch (t) {
                                    i.last().attr("data-flashcard", "true")
                                }
                            })
                        }
                    }),
                    p.on("click", ".highlight-remove", function(e) {
                        e.preventDefault();
                        var n = p.attr("data-uid");
                        n ? t(".highlighted[data-uid=" + n + "]").each(function(t, e) {
                            f.removeHighlights(e)
                        }) : t(".highlighted:not([data-uid])").each(function(t, e) {
                            f.removeHighlights(e)
                        })
                    }),
                    p.on("click", ".highlight-save", function(e) {
                        var n = p.attr("data-uid");
                        if (n) {
                            e.preventDefault();
                            var i = t(".highlighted[data-uid=" + n + "]")
                              , o = p.find("textarea")
                              , a = o.val().trim()
                              , r = o.attr("note-uid");
                            if (a) {
                                var l, s, c = i.last().attr("data-note") || "";
                                r ? s = (l = t(".highlighted-note[note-uid='" + r + "']")).text().trim() : l = t(g.replace("{{txt}}", a)),
                                l.attr("data-uid", n),
                                l.off("click", ".highlighted-note-remove"),
                                l.off("dblclick"),
                                s ? (c = c.replace(s, a),
                                i.last().attr("data-note", c),
                                l.html("\n        {{txt}}\n        <span class='highlighted-note-remove fal fa-times ml-1'></span>\n    ".replace("{{txt}}", a))) : (i.last().attr("data-note", c + "*|*" + a),
                                i.last().append(l)),
                                "true" == l.closest(".text-highlightable").attr("data-draggable") && l.draggable(),
                                l.one("click", ".highlighted-note-remove", function() {
                                    i.removeAttr("data-note"),
                                    l.remove()
                                }),
                                l.on("dblclick", function(t) {
                                    "highlighted-note-remove" != t.target.className && (m(),
                                    v(l))
                                })
                            }
                            w()
                        }
                    }),
                    p.on("click", ".highlight-color", function(e) {
                        var n = t(this)
                          , i = p.attr("data-uid");
                        if (i) {
                            e.preventDefault();
                            var o = t(".highlighted[data-uid=" + i + "]")
                              , a = n[0].className;
                            o.each(function(t, e) {
                                e.style.backgroundColor = n.css("background-color"),
                                e.style.borderBottom = n.css("border-bottom"),
                                e.style.textDecoration = n.css("text-decoration")
                            }),
                            f.setColor(n.css("background-color")),
                            a.indexOf("underred") ? f.setUnderline(n.css("border-bottom")) : f.setUnderline(""),
                            a.indexOf("crossed") ? f.setCrossed(n.css("text-decoration")) : f.setCrossed("")
                        }
                    }),
                    p.on("click", ".highlight-note", function(t) {
                        t.preventDefault(),
                        v()
                    }),
                    t(".text-highlightable").on("click", ".highlighted", function(t) {
                        m(this)
                    }),
                    t("body").on("click", function(e) {
                        var n = t(e.target);
                        n.parents(".highlight-control").length || n.hasClass("highlighted") ? e.preventDefault() : w()
                    }),
                    f.webStoreHighlights = function(e) {
                        var n = r.attr("data-target")
                          , o = h();
                        if (!o || !JSON.parse(o).length)
                            return e();
                        t.post(n, {
                            data: o,
                            highlight_id: i
                        }, function(t) {
                            return i = t.highlight_id,
                            u(o),
                            e()
                        }).fail(function(t, e, n) {
                            return alert("Error saving, please try again!"),
                            !1
                        })
                    }
                    ,
                    f.webRestoreHighlights = function() {
                        l.find("option").length <= 1 || (l.val(l.find("option")[1].value),
                        l.change())
                    }
                    ,
                    f
                }();
                var c = t(".jqmedia-comments");
                c.length && (c.arrive(".jqmedia-comment", function(e) {
                    var n = t(this)
                      , i = n.find(".comment-content");
                    i.html(i.text().replaceAll(/([0-5]?)[0-9](:|;)[0-5][0-9]/g, '<span class="link jqmedia-comment-timestamp" data-timestamp="$&"><b>$&</b></span>'))
                }),
                c.on("click", ".jqmedia-comment-timestamp", function(e) {
                    var n = t(this)
                      , i = n.attr("data-timestamp").replace(";", ":")
                      , o = function(t) {
                        for (var e = t.split(":"), n = 0, i = 1; e.length > 0; )
                            n += i * parseInt(e.pop(), 10),
                            i *= 60;
                        return n
                    }(i)
                      , a = n.closest("[data-jqmedia-id]");
                    if (a.length) {
                        var r = window.players[a.attr("data-jqmedia-id")];
                        r && (r.paused ? r.play().then(function() {
                            r.currentTime = o,
                            setTimeout(function() {
                                r.playing && r.pause()
                            }, 5e3)
                        }) : r.currentTime = o)
                    }
                }))
            }),
            window.shuffle = function(t) {
                var e, n, i;
                for (i = t.length - 1; i > 0; i--)
                    e = Math.floor(Math.random() * (i + 1)),
                    n = t[i],
                    t[i] = t[e],
                    t[e] = n;
                return t
            }
            ,
            window.shuffleArray = function(t) {
                for (var e = t.length - 1; e > 0; e--) {
                    var n = Math.floor(Math.random() * (e + 1))
                      , i = t[e];
                    t[e] = t[n],
                    t[n] = i
                }
                return t
            }
            ,
            window.randomN = function(t, e) {
                var n = t.slice();
                return (n = n.sort(function() {
                    return .5 - Math.random()
                })).slice(0, e)
            }
            ,
            window.get_cuid = function() {
                var t = "study4_cuid_" + (window.current_user || {
                    id: null
                }).id
                  , e = localStorage.getItem(t);
                return e || (e = (0,
                d.v4)(),
                localStorage.setItem(t, e)),
                e
            }
            ,
            window.site_settings = new function() {
                this.current_user = window.current_user || {
                    id: null
                },
                this.settings_key = "sitewide_user_settings_" + this.current_user.id,
                this.settings = {},
                this.load = function() {
                    var t = localStorage.getItem(this.settings_key);
                    return t && (this.settings = JSON.parse(t)),
                    t
                }
                ,
                this.save = function(t, e) {
                    this.settings[t] = e,
                    localStorage.setItem(this.settings_key, JSON.stringify(this.settings))
                }
                ,
                this.get = function(t) {
                    return this.settings[t]
                }
                ,
                this.clear = function(t) {
                    delete this.settings[t],
                    localStorage.setItem(this.settings_key, JSON.stringify(this.settings))
                }
                ,
                this.load()
            }
        }
        ).call(e, n(0), n(14))
    }
}, [54]);
