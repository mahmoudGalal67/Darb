(() => {
  "use strict";
  var t = {
      d: (e, i) => {
        for (var s in i)
          t.o(i, s) &&
            !t.o(e, s) &&
            Object.defineProperty(e, s, {
              enumerable: !0,
              get: i[s],
            });
      },
      o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
      r: (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module",
          }),
          Object.defineProperty(t, "__esModule", {
            value: !0,
          });
      },
    },
    e = {};
  function i(t) {
    if (((this.formData = {}), (this.tree = {}), !(t instanceof FormData)))
      return this;
    this.formData = t;
    const e = () => {
      const t = new Map();
      return (
        (t.largestIndex = 0),
        (t.set = function (e, i) {
          "" === e
            ? (e = t.largestIndex++)
            : /^[0-9]+$/.test(e) &&
              ((e = parseInt(e)),
              t.largestIndex <= e && (t.largestIndex = e + 1)),
            Map.prototype.set.call(t, e, i);
        }),
        t
      );
    };
    this.tree = e();
    const i =
      /^(?<name>[a-z][-a-z0-9_:]*)(?<array>(?:\[(?:[a-z][-a-z0-9_:]*|[0-9]*)\])*)/i;
    for (const [t, s] of this.formData) {
      const o = t.match(i);
      if (o)
        if ("" === o.groups.array) this.tree.set(o.groups.name, s);
        else {
          const t = [
            ...o.groups.array.matchAll(/\[([a-z][-a-z0-9_:]*|[0-9]*)\]/gi),
          ].map(([t, e]) => e);
          t.unshift(o.groups.name);
          const i = t.pop();
          t.reduce((t, i) => {
            if (
              (/^[0-9]+$/.test(i) && (i = parseInt(i)), t.get(i) instanceof Map)
            )
              return t.get(i);
            const s = e();
            return t.set(i, s), s;
          }, this.tree).set(i, s);
        }
    }
  }
  t.r(e),
    t.d(e, {
      all: () => D,
      any: () => M,
      date: () => f,
      dayofweek: () => u,
      email: () => r,
      enum: () => h,
      file: () => m,
      maxdate: () => z,
      maxfilesize: () => $,
      maxitems: () => v,
      maxlength: () => x,
      maxnumber: () => b,
      mindate: () => A,
      minfilesize: () => j,
      minitems: () => w,
      minlength: () => g,
      minnumber: () => y,
      number: () => c,
      required: () => n,
      requiredfile: () => a,
      tel: () => l,
      time: () => d,
      url: () => p,
    }),
    (i.prototype.entries = function () {
      return this.tree.entries();
    }),
    (i.prototype.get = function (t) {
      return this.tree.get(t);
    }),
    (i.prototype.getAll = function (t) {
      if (!this.has(t)) return [];
      const e = (t) => {
        const i = [];
        if (t instanceof Map) for (const [s, o] of t) i.push(...e(o));
        else "" !== t && i.push(t);
        return i;
      };
      return e(this.get(t));
    }),
    (i.prototype.has = function (t) {
      return this.tree.has(t);
    }),
    (i.prototype.keys = function () {
      return this.tree.keys();
    }),
    (i.prototype.values = function () {
      return this.tree.values();
    });
  const s = i;
  function o({ rule: t, field: e, error: i, ...s }) {
    (this.rule = t), (this.field = e), (this.error = i), (this.properties = s);
  }
  const n = function (t) {
      if (0 === t.getAll(this.field).length) throw new o(this);
    },
    a = function (t) {
      if (0 === t.getAll(this.field).length) throw new o(this);
    },
    r = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          if ((t = t.trim()).length < 6) return !1;
          if (-1 === t.indexOf("@", 1)) return !1;
          if (t.indexOf("@") !== t.lastIndexOf("@")) return !1;
          const [e, i] = t.split("@", 2);
          if (!/^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~\.-]+$/.test(e)) return !1;
          if (/\.{2,}/.test(i)) return !1;
          if (/(?:^[ \t\n\r\0\x0B.]|[ \t\n\r\0\x0B.]$)/.test(i)) return !1;
          const s = i.split(".");
          if (s.length < 2) return !1;
          for (const t of s) {
            if (/(?:^[ \t\n\r\0\x0B-]|[ \t\n\r\0\x0B-]$)/.test(t)) return !1;
            if (!/^[a-z0-9-]+$/i.test(t)) return !1;
          }
          return !0;
        })
      )
        throw new o(this);
    },
    p = function (t) {
      const e = t.getAll(this.field);
      if (
        !e.every((t) => {
          if ("" === (t = t.trim())) return !1;
          try {
            return ((t) =>
              -1 !==
              [
                "http",
                "https",
                "ftp",
                "ftps",
                "mailto",
                "news",
                "irc",
                "irc6",
                "ircs",
                "gopher",
                "nntp",
                "feed",
                "telnet",
                "mms",
                "rtsp",
                "sms",
                "svn",
                "tel",
                "fax",
                "xmpp",
                "webcal",
                "urn",
              ].indexOf(t))(new URL(t).protocol.replace(/:$/, ""));
          } catch {
            return !1;
          }
        })
      )
        throw new o(this);
    },
    l = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = (t = t.trim()).replaceAll(/[()/.*#\s-]+/g, "")),
              /^[+]?[0-9]+$/.test(t)
            )
          )
      )
        throw new o(this);
    },
    c = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !!/^[-]?[0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t) ||
                !!/^[-]?(?:[0-9]+)?[.][0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t)
            )
          )
      )
        throw new o(this);
    },
    f = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          if (((t = t.trim()), !/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t)))
            return !1;
          const e = new Date(t);
          return !Number.isNaN(e.valueOf());
        })
      )
        throw new o(this);
    },
    d = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          const e = t.trim().match(/^([0-9]{2})\:([0-9]{2})(?:\:([0-9]{2}))?$/);
          if (!e) return !1;
          const i = parseInt(e[1]),
            s = parseInt(e[2]),
            o = e[3] ? parseInt(e[3]) : 0;
          return 0 <= i && i <= 23 && 0 <= s && s <= 59 && 0 <= o && o <= 59;
        })
      )
        throw new o(this);
    },
    m = function (t) {
      if (
        !t.getAll(this.field).every(
          (t) =>
            t instanceof File &&
            this.accept?.some((e) =>
              /^\.[a-z0-9]+$/i.test(e)
                ? t.name.toLowerCase().endsWith(e.toLowerCase())
                : ((t) => {
                    const e = [],
                      i = t.match(
                        /^(?<toplevel>[a-z]+)\/(?<sub>[*]|[a-z0-9.+-]+)$/i
                      );
                    if (i) {
                      const t = i.groups.toplevel.toLowerCase(),
                        s = i.groups.sub.toLowerCase();
                      for (const [o, n] of (() => {
                        const t = new Map();
                        return (
                          t.set("jpg|jpeg|jpe", "image/jpeg"),
                          t.set("gif", "image/gif"),
                          t.set("png", "image/png"),
                          t.set("bmp", "image/bmp"),
                          t.set("tiff|tif", "image/tiff"),
                          t.set("webp", "image/webp"),
                          t.set("ico", "image/x-icon"),
                          t.set("heic", "image/heic"),
                          t.set("asf|asx", "video/x-ms-asf"),
                          t.set("wmv", "video/x-ms-wmv"),
                          t.set("wmx", "video/x-ms-wmx"),
                          t.set("wm", "video/x-ms-wm"),
                          t.set("avi", "video/avi"),
                          t.set("divx", "video/divx"),
                          t.set("flv", "video/x-flv"),
                          t.set("mov|qt", "video/quicktime"),
                          t.set("mpeg|mpg|mpe", "video/mpeg"),
                          t.set("mp4|m4v", "video/mp4"),
                          t.set("ogv", "video/ogg"),
                          t.set("webm", "video/webm"),
                          t.set("mkv", "video/x-matroska"),
                          t.set("3gp|3gpp", "video/3gpp"),
                          t.set("3g2|3gp2", "video/3gpp2"),
                          t.set("txt|asc|c|cc|h|srt", "text/plain"),
                          t.set("csv", "text/csv"),
                          t.set("tsv", "text/tab-separated-values"),
                          t.set("ics", "text/calendar"),
                          t.set("rtx", "text/richtext"),
                          t.set("css", "text/css"),
                          t.set("htm|html", "text/html"),
                          t.set("vtt", "text/vtt"),
                          t.set("dfxp", "application/ttaf+xml"),
                          t.set("mp3|m4a|m4b", "audio/mpeg"),
                          t.set("aac", "audio/aac"),
                          t.set("ra|ram", "audio/x-realaudio"),
                          t.set("wav", "audio/wav"),
                          t.set("ogg|oga", "audio/ogg"),
                          t.set("flac", "audio/flac"),
                          t.set("mid|midi", "audio/midi"),
                          t.set("wma", "audio/x-ms-wma"),
                          t.set("wax", "audio/x-ms-wax"),
                          t.set("mka", "audio/x-matroska"),
                          t.set("rtf", "application/rtf"),
                          t.set("js", "application/javascript"),
                          t.set("pdf", "application/pdf"),
                          t.set("swf", "application/x-shockwave-flash"),
                          t.set("class", "application/java"),
                          t.set("tar", "application/x-tar"),
                          t.set("zip", "application/zip"),
                          t.set("gz|gzip", "application/x-gzip"),
                          t.set("rar", "application/rar"),
                          t.set("7z", "application/x-7z-compressed"),
                          t.set("exe", "application/x-msdownload"),
                          t.set("psd", "application/octet-stream"),
                          t.set("xcf", "application/octet-stream"),
                          t.set("doc", "application/msword"),
                          t.set("pot|pps|ppt", "application/vnd.ms-powerpoint"),
                          t.set("wri", "application/vnd.ms-write"),
                          t.set("xla|xls|xlt|xlw", "application/vnd.ms-excel"),
                          t.set("mdb", "application/vnd.ms-access"),
                          t.set("mpp", "application/vnd.ms-project"),
                          t.set(
                            "docx",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          ),
                          t.set(
                            "docm",
                            "application/vnd.ms-word.document.macroEnabled.12"
                          ),
                          t.set(
                            "dotx",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.template"
                          ),
                          t.set(
                            "dotm",
                            "application/vnd.ms-word.template.macroEnabled.12"
                          ),
                          t.set(
                            "xlsx",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          ),
                          t.set(
                            "xlsm",
                            "application/vnd.ms-excel.sheet.macroEnabled.12"
                          ),
                          t.set(
                            "xlsb",
                            "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
                          ),
                          t.set(
                            "xltx",
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.template"
                          ),
                          t.set(
                            "xltm",
                            "application/vnd.ms-excel.template.macroEnabled.12"
                          ),
                          t.set(
                            "xlam",
                            "application/vnd.ms-excel.addin.macroEnabled.12"
                          ),
                          t.set(
                            "pptx",
                            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                          ),
                          t.set(
                            "pptm",
                            "application/vnd.ms-powerpoint.presentation.macroEnabled.12"
                          ),
                          t.set(
                            "ppsx",
                            "application/vnd.openxmlformats-officedocument.presentationml.slideshow"
                          ),
                          t.set(
                            "ppsm",
                            "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
                          ),
                          t.set(
                            "potx",
                            "application/vnd.openxmlformats-officedocument.presentationml.template"
                          ),
                          t.set(
                            "potm",
                            "application/vnd.ms-powerpoint.template.macroEnabled.12"
                          ),
                          t.set(
                            "ppam",
                            "application/vnd.ms-powerpoint.addin.macroEnabled.12"
                          ),
                          t.set(
                            "sldx",
                            "application/vnd.openxmlformats-officedocument.presentationml.slide"
                          ),
                          t.set(
                            "sldm",
                            "application/vnd.ms-powerpoint.slide.macroEnabled.12"
                          ),
                          t.set(
                            "onetoc|onetoc2|onetmp|onepkg",
                            "application/onenote"
                          ),
                          t.set("oxps", "application/oxps"),
                          t.set("xps", "application/vnd.ms-xpsdocument"),
                          t.set(
                            "odt",
                            "application/vnd.oasis.opendocument.text"
                          ),
                          t.set(
                            "odp",
                            "application/vnd.oasis.opendocument.presentation"
                          ),
                          t.set(
                            "ods",
                            "application/vnd.oasis.opendocument.spreadsheet"
                          ),
                          t.set(
                            "odg",
                            "application/vnd.oasis.opendocument.graphics"
                          ),
                          t.set(
                            "odc",
                            "application/vnd.oasis.opendocument.chart"
                          ),
                          t.set(
                            "odb",
                            "application/vnd.oasis.opendocument.database"
                          ),
                          t.set(
                            "odf",
                            "application/vnd.oasis.opendocument.formula"
                          ),
                          t.set("wp|wpd", "application/wordperfect"),
                          t.set("key", "application/vnd.apple.keynote"),
                          t.set("numbers", "application/vnd.apple.numbers"),
                          t.set("pages", "application/vnd.apple.pages"),
                          t
                        );
                      })())
                        (("*" === s && n.startsWith(t + "/")) || n === i[0]) &&
                          e.push(...o.split("|"));
                    }
                    return e;
                  })(e).some(
                    (e) => (
                      (e = "." + e.trim()),
                      t.name.toLowerCase().endsWith(e.toLowerCase())
                    )
                  )
            )
        )
      )
        throw new o(this);
    },
    h = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => this.accept?.some((e) => t === String(e)))
      )
        throw new o(this);
    },
    u = function (t) {
      if (
        !t.getAll(this.field).every((t) => {
          const e = 0 === (i = new Date(t).getDay()) ? 7 : i;
          var i;
          return this.accept?.some((t) => e === parseInt(t));
        })
      )
        throw new o(this);
    },
    w = function (t) {
      if (t.getAll(this.field).length < parseInt(this.threshold))
        throw new o(this);
    },
    v = function (t) {
      const e = t.getAll(this.field);
      if (parseInt(this.threshold) < e.length) throw new o(this);
    },
    g = function (t) {
      const e = t.getAll(this.field);
      let i = 0;
      if (
        (e.forEach((t) => {
          "string" == typeof t && (i += t.length);
        }),
        0 !== i && i < parseInt(this.threshold))
      )
        throw new o(this);
    },
    x = function (t) {
      const e = t.getAll(this.field);
      let i = 0;
      if (
        (e.forEach((t) => {
          "string" == typeof t && (i += t.length);
        }),
        parseInt(this.threshold) < i)
      )
        throw new o(this);
    },
    y = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => !(parseFloat(t) < parseFloat(this.threshold)))
      )
        throw new o(this);
    },
    b = function (t) {
      if (
        !t
          .getAll(this.field)
          .every((t) => !(parseFloat(this.threshold) < parseFloat(t)))
      )
        throw new o(this);
    },
    A = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !(
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t) &&
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold) &&
                t < this.threshold
              )
            )
          )
      )
        throw new o(this);
    },
    z = function (t) {
      if (
        !t
          .getAll(this.field)
          .every(
            (t) => (
              (t = t.trim()),
              !(
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t) &&
                /^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold) &&
                this.threshold < t
              )
            )
          )
      )
        throw new o(this);
    },
    j = function (t) {
      const e = t.getAll(this.field);
      let i = 0;
      if (
        (e.forEach((t) => {
          t instanceof File && (i += t.size);
        }),
        i < parseInt(this.threshold))
      )
        throw new o(this);
    },
    $ = function (t) {
      const e = t.getAll(this.field);
      let i = 0;
      if (
        (e.forEach((t) => {
          t instanceof File && (i += t.size);
        }),
        parseInt(this.threshold) < i)
      )
        throw new o(this);
    },
    I = ({ ruleObj: t, options: i }) => {
      const { rule: s, ...o } = t;
      return (
        "function" == typeof e[s] &&
        ("function" != typeof e[s].matches || e[s].matches(o, i))
      );
    },
    O = ({ ruleObj: t, formDataTree: i, options: s }) => {
      const { rule: o } = t;
      e[o].call(t, i, s);
    },
    E = [],
    k = (t) => [...E].reduce((t, e) => (i) => e(i, t), t),
    D = function (t, e = {}) {
      const i = (this.rules ?? []).filter((t) =>
          I({
            ruleObj: t,
            options: e,
          })
        ),
        s = k(O);
      if (
        !i.every((i) => {
          try {
            s({
              ruleObj: i,
              formDataTree: t,
              options: e,
            });
          } catch (t) {
            if (!(t instanceof o)) throw t;
            if (void 0 !== t.error) throw t;
            return !1;
          }
          return !0;
        })
      )
        throw new o(this);
    },
    M = function (t, e = {}) {
      const i = (this.rules ?? []).filter((t) =>
          I({
            ruleObj: t,
            options: e,
          })
        ),
        s = k(O);
      if (
        !i.some((i) => {
          try {
            s({
              ruleObj: i,
              formDataTree: t,
              options: e,
            });
          } catch (t) {
            if (!(t instanceof o)) throw t;
            return !1;
          }
          return !0;
        })
      )
        throw new o(this);
    };
  var F;
  window.swv = {
    validators: e,
    validate: (t, e, i = {}) => {
      const n = (t.rules ?? []).filter((t) =>
        I({
          ruleObj: t,
          options: i,
        })
      );
      if (!n.length) return new Map();
      const a = k(O),
        r = new s(e),
        p = n.reduce((t, e) => {
          try {
            a({
              ruleObj: e,
              formDataTree: r,
              options: i,
            });
          } catch (e) {
            if (!(e instanceof o)) throw e;
            if (void 0 !== e.field && !t.has(e.field) && void 0 !== e.error)
              return t.set(e.field, e);
          }
          return t;
        }, new Map());
      for (const t of r.keys())
        p.has(t) ||
          p.set(t, {
            validInputs: r.getAll(t),
          });
      return p;
    },
    use: (t) => {
      E.push(t);
    },
    ...(null !== (F = window.swv) && void 0 !== F ? F : {}),
  };
})();
