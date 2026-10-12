import { useState, useEffect, useRef } from 'react'

const MAQUINAS = [
  { id: 'M01', nombre: 'Centro Comercial 1 - Piso 2', direccion: 'Av. Los Álamos 500', temp: '15°C', estado: 'pendiente' },
  { id: 'M02', nombre: 'Universidad - Pabellón Central', direccion: 'Av. Universitaria 210', temp: '15°C', estado: 'pendiente' },
  { id: 'M03', nombre: 'Centro Comercial 2 - Food Court', direccion: 'Av. Los Próceres 1009', temp: '15°C', estado: 'completada' },
]

// Catálogo de ejemplo basado en un reporte diario de reposición (datos de muestra)
const CATALOGO_REAL = [
  // Bebidas sin gas / agua
  { sku: 'INCA', nombre: 'Inca Kola', cat: 'Bebida', capacidad: 20, actual: 14 },
  { sku: 'COCA', nombre: 'Coca Cola', cat: 'Bebida', capacidad: 20, actual: 18 },
  { sku: 'SL_SG', nombre: 'San Luis sin gas', cat: 'Agua', capacidad: 15, actual: 6 },
  { sku: 'CIE_SG', nombre: 'Cielo sin gas', cat: 'Agua', capacidad: 15, actual: 15 },
  { sku: 'PEPSI', nombre: 'Pepsi', cat: 'Bebida', capacidad: 15, actual: 15 },
  { sku: 'GUAR', nombre: 'Guarana', cat: 'Bebida', capacidad: 15, actual: 15 },
  { sku: 'SPRITE', nombre: 'Sprite', cat: 'Bebida', capacidad: 15, actual: 12 },
  { sku: 'FAN_N', nombre: 'Fanta naranja', cat: 'Bebida', capacidad: 15, actual: 14 },
  { sku: 'FAN_R', nombre: 'Fanta rojo', cat: 'Bebida', capacidad: 15, actual: 11 },
  { sku: 'CIE_CG', nombre: 'Cielo con gas', cat: 'Agua', capacidad: 15, actual: 15 },
  { sku: 'FRU_N', nombre: 'Frugos naranja', cat: 'Jugo', capacidad: 12, actual: 12 },
  { sku: 'FRU_D', nombre: 'Frugos durazno', cat: 'Jugo', capacidad: 12, actual: 12 },
  { sku: 'SPO_R', nombre: 'Sporade rojo', cat: 'Rehidratante', capacidad: 12, actual: 12 },
  { sku: 'SPO_A', nombre: 'Sporade azul', cat: 'Rehidratante', capacidad: 12, actual: 12 },
  { sku: 'SPO_M', nombre: 'Sporade mandarina', cat: 'Rehidratante', capacidad: 12, actual: 9 },
  { sku: 'VOLT', nombre: 'Volt', cat: 'Energizante', capacidad: 12, actual: 12 },
  { sku: 'FURY', nombre: 'Fury', cat: 'Energizante', capacidad: 12, actual: 12 },
  // Snacks / galletas
  { sku: 'RITZ', nombre: 'Ritz', cat: 'Galleta', capacidad: 12, actual: 12 },
  { sku: 'NIK', nombre: 'Nik', cat: 'Snack', capacidad: 12, actual: 12 },
  { sku: 'HALLS', nombre: 'Halls', cat: 'Caramelo', capacidad: 12, actual: 12 },
  { sku: 'SUBL', nombre: 'Sublime', cat: 'Chocolate', capacidad: 15, actual: 10 },
  { sku: 'OREO', nombre: 'Oreo', cat: 'Galleta', capacidad: 12, actual: 12 },
  { sku: 'MORO', nombre: 'Morochas', cat: 'Galleta', capacidad: 12, actual: 12 },
  { sku: 'CHOCM', nombre: 'Chocman', cat: 'Galleta', capacidad: 12, actual: 12 },
  { sku: 'PICA', nombre: 'Pica', cat: 'Snack', capacidad: 12, actual: 12 },
  { sku: 'CASINO', nombre: 'Casino', cat: 'Galleta', capacidad: 12, actual: 12 },
  { sku: 'CLUB', nombre: 'Club social', cat: 'Galleta', capacidad: 12, actual: 12 },
  { sku: 'TRAV', nombre: 'Travesuras', cat: 'Galleta', capacidad: 12, actual: 8 },
  { sku: 'CHIPS', nombre: 'Chips Ahoy', cat: 'Galleta', capacidad: 12, actual: 9 },
  { sku: 'CUACUA', nombre: 'Cua Cua', cat: 'Galleta', capacidad: 12, actual: 6 },
  { sku: 'CHET_A', nombre: 'Cheetos amarillo', cat: 'Snack', capacidad: 12, actual: 12 },
  { sku: 'CHET_R', nombre: 'Cheetos rojo', cat: 'Snack', capacidad: 12, actual: 12 },
  { sku: 'CHEE', nombre: 'Cheese Tris', cat: 'Snack', capacidad: 12, actual: 12 },
  { sku: 'PIQ', nombre: 'Piqueos snack', cat: 'Snack', capacidad: 12, actual: 12 },
  { sku: 'LAYS', nombre: 'Lays', cat: 'Snack', capacidad: 12, actual: 11 },
  { sku: 'KARIN', nombre: 'Karinto', cat: 'Snack', capacidad: 12, actual: 12 },
  { sku: 'DORI', nombre: 'Doritos', cat: 'Snack', capacidad: 12, actual: 10 },
]

// Reporte de ejemplo para precargar
const REPORTE_EJEMPLO = {
  'INCA':6,'COCA':2,'SL_SG':9,'CIE_SG':0,'PEPSI':0,'GUAR':0,'SPRITE':3,'FAN_N':1,'FAN_R':4,'CIE_CG':0,'FRU_N':0,'FRU_D':0,'SPO_R':0,'SPO_A':0,'SPO_M':3,'VOLT':0,'FURY':0,'RITZ':0,'NIK':0,'HALLS':0,'SUBL':5,'OREO':0,'MORO':0,'CHOCM':0,'PICA':0,'CASINO':0,'CLUB':0,'TRAV':4,'CHIPS':3,'CUACUA':6,'CHET_A':0,'CHET_R':0,'CHEE':0,'PIQ':0,'LAYS':1,'KARIN':0,'DORI':2
}

function PhotoField({ label, hint, value, onChange, required, ejemplo }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(value || null)
  useEffect(()=> setPreview(value), [value])
  const handleFile = (e)=>{
    const f = e.target.files[0]
    if(!f) return
    const r = new FileReader()
    r.onload = ()=> { setPreview(r.result); onChange(r.result) }
    r.readAsDataURL(f)
  }
  return (
    <div className="bg-white border rounded-xl p-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800 flex gap-1 flex-wrap">{label} {required && <span className="text-red-500">*</span>} {preview && <span className="text-emerald-600 text-xs bg-emerald-50 px-2 py-0.5 rounded-full">✓</span>}</p>
          <p className="text-xs text-slate-500">{hint}</p>
          {ejemplo && !preview && <p className="text-[11px] bg-slate-50 border border-dashed rounded-lg p-2 mt-2 text-slate-600">{ejemplo}</p>}
        </div>
        <button onClick={()=>inputRef.current.click()} className={`text-xs px-3 py-2 rounded-lg font-medium border shrink-0 ${preview?'bg-slate-900 text-white border-slate-900':'bg-white border-slate-300 text-slate-700'}`}>{preview?'Cambiar':'Tomar foto'}</button>
      </div>
      {preview && <img src={preview} className="mt-3 w-full h-44 object-cover rounded-lg border" alt="preview" />}
      <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
    </div>
  )
}

export default function App(){
  const [rol, setRol] = useState('operario')
  const [maquinaActiva, setMaquinaActiva] = useState(null)
  const [paso, setPaso] = useState(1)
  const [filtroCat, setFiltroCat] = useState('Todos')
  const [visitas, setVisitas] = useState(()=> {
    const s = localStorage.getItem('vendi_visitas_v2')
    return s? JSON.parse(s) : []
  })
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({
    tempFoto: null, tempValor: '15°C', huboError: 'no', errorDetalle: '', errorSolucion: '',
    ventasHoyFoto: null, ventasAyerFoto: null, sencilleroFoto: null,
    productos: CATALOGO_REAL.map(p=> ({...p, reponer: 0})),
    stockFoto: null, almacenIzqFoto: null, almacenDerFoto: null,
    billetes: '', monedas: '', observacion: ''
  })

  useEffect(()=> localStorage.setItem('vendi_visitas_v2', JSON.stringify(visitas)), [visitas])
  const showToast = (msg)=> { setToast(msg); setTimeout(()=> setToast(null), 2800) }

  const aplicarEjemplo = ()=>{
    setForm(f=> ({...f, productos: f.productos.map(p=> ({...p, reponer: REPORTE_EJEMPLO[p.sku]||0}))}))
    showToast('📋 Reporte de ejemplo cargado (47 productos) — edita y envía por WhatsApp')
  }
  const limpiarCantidades = ()=> setForm(f=> ({...f, productos: f.productos.map(p=> ({...p, reponer:0}))}))

  const productosConCantidad = form.productos.filter(p=> p.reponer>0)
  const totalUnidades = productosConCantidad.reduce((a,b)=>a+b.reponer,0)

  const generarTextoWhatsApp = ()=>{
    const fecha = new Date().toLocaleDateString('es-PE')
    const lineas = productosConCantidad.map(p=> `${p.nombre} ${p.reponer}`)
    // Si no hay cantidades, igual listar todo con 0? No, solo los >0 del reporte de ejemplo
    if(lineas.length===0) return `Reporte ${maquinaActiva?.nombre||'Máquina'} - ${fecha}\nSin reposición`
    const header = `*Reporte ${maquinaActiva?.nombre||'Máquina'} - ${fecha}*\nTemp: ${form.tempValor} | Total: ${totalUnidades} u.\n`
    const ventasInfo = form.ventasHoyFoto && form.ventasAyerFoto ? `\n(Ventas fotos adjuntas)` : ''
    const dineroInfo = (form.billetes||form.monedas) ? `\n💰 Recaudado: S/ ${((parseFloat(form.billetes)||0)+(parseFloat(form.monedas)||0)).toFixed(2)}` : ''
    return header + lineas.join('\n') + ventasInfo + dineroInfo + `\n\n_Fotos: Temp, Ventas hoy/ayer, Sencillero, Stock lleno, 2 almacenes_`
  }
  const textoWA = generarTextoWhatsApp()

  const copiarWA = async ()=>{
    try{ await navigator.clipboard.writeText(textoWA); showToast('📋 Copiado al portapapeles') } catch{ showToast('Copia manual el texto') }
  }
  const enviarWA = ()=>{
    const url = `https://wa.me/?text=${encodeURIComponent(textoWA)}`
    window.open(url, '_blank')
  }

  const iniciarVisita = (m)=>{
    setMaquinaActiva(m)
    setPaso(1)
    setForm({
      tempFoto: null, tempValor: '15°C', huboError:'no', errorDetalle:'', errorSolucion:'',
      ventasHoyFoto:null, ventasAyerFoto:null, sencilleroFoto:null,
      productos: CATALOGO_REAL.map(p=> ({...p, reponer:0})),
      stockFoto:null, almacenIzqFoto:null, almacenDerFoto:null,
      billetes:'', monedas:'', observacion:''
    })
    window.scrollTo(0,0)
  }

  const guardarVisita = ()=>{
    if(!form.tempFoto || !form.ventasHoyFoto || !form.ventasAyerFoto || !form.sencilleroFoto || !form.stockFoto){
      showToast('⚠️ Faltan fotos obligatorias (temp, ventas hoy/ayer, sencillero, stock lleno)')
      return
    }
    if(totalUnidades===0){
      if(!confirm('¿Guardar sin productos ingresados? El reporte de ejemplo siempre incluye al menos 1.')) return
    }
    const total = (parseFloat(form.billetes)||0) + (parseFloat(form.monedas)||0)
    const nueva = {
      id: Date.now(),
      fecha: new Date().toLocaleString('es-PE'),
      maquina: maquinaActiva,
      form: {...form},
      totalRecaudado: total,
      textoWA,
      totalUnidades,
      estado: 'completada'
    }
    setVisitas([nueva, ...visitas])
    setMaquinaActiva(null)
    showToast('✅ Visita guardada. Reporte WhatsApp listo en historial.')
  }

  const totalDinero = ((parseFloat(form.billetes)||0)+(parseFloat(form.monedas)||0)).toFixed(2)
  const categorias = ['Todos', ...new Set(CATALOGO_REAL.map(p=>p.cat))]
  const productosFiltrados = filtroCat==='Todos' ? form.productos : form.productos.filter(p=>p.cat===filtroCat)

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 h-[56px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white grid place-items-center font-black text-sm">VD</div>
            <div>
              <p className="font-bold leading-none text-slate-900">VENDI<span className="font-light">PRO</span></p>
              <p className="text-[11px] text-slate-500 leading-none">Control expendedoras • Perú</p>
            </div>
            <span className="hidden lg:inline-flex ml-3 text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full border border-emerald-200">Reporte WA integrado ✓</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex bg-slate-100 p-1 rounded-full text-xs font-medium">
              {[
                {k:'operario', l:'📱 Operario'},
                {k:'almacen', l:'📦 Almacén'},
                {k:'admin', l:'📊 Admin'},
              ].map(r=> (
                <button key={r.k} onClick={()=> setRol(r.k)} className={`px-3 py-1.5 rounded-full transition ${rol===r.k?'bg-white shadow text-slate-900':'text-slate-500 hover:text-slate-700'}`}>{r.l}</button>
              ))}
            </div>
            <select value={rol} onChange={e=>setRol(e.target.value)} className="sm:hidden border rounded-lg px-2 py-1 text-sm">
              <option value="operario">Operario</option>
              <option value="almacen">Almacén</option>
              <option value="admin">Admin</option>
            </select>
            <div className="w-8 h-8 rounded-full bg-slate-200 grid place-items-center text-sm">👤</div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-5">
        {rol === 'operario' && !maquinaActiva && (
          <>
            <div className="grid md:grid-cols-3 gap-3 mb-5">
              <div className="bg-slate-900 text-white rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs opacity-70">Ruta de hoy • {new Date().toLocaleDateString('es-PE',{weekday:'long', day:'numeric', month:'short'})}</p>
                  <p className="font-bold text-lg">06:00 – almacén Central → nuevo local pronto</p>
                  <p className="text-xs opacity-70">Mochila asignada: #14 • Control exacto</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/15 grid place-items-center text-xl">🎒</div>
              </div>
              <div className="bg-white rounded-2xl p-4 border flex justify-between items-center">
                <div><p className="text-xs text-slate-500">Máquinas pendientes</p><p className="text-2xl font-black">2<span className="text-sm font-normal text-slate-500">/3</span></p><p className="text-xs text-slate-400">37 SKUs en catálogo</p></div>
                <div className="text-right"><p className="text-xs text-slate-500">Recaudado hoy</p><p className="font-bold">S/ {(visitas.reduce((a,b)=>a+b.totalRecaudado,0)).toFixed(2)}</p><p className="text-xs text-slate-400">{visitas.reduce((a,b)=>a+b.totalUnidades,0)} u. ingresadas</p></div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <p className="text-xs font-bold text-emerald-800">💬 Reporte WhatsApp automático</p>
                <p className="text-xs text-emerald-900 leading-snug mt-1">Al llenar, el app genera el texto como lo mandas hoy: <i>Inca 6, Coca 2, San Luis 9...</i> + botón Enviar a WhatsApp.</p>
              </div>
            </div>

            <h2 className="font-bold text-slate-900 mb-3">Máquinas asignadas</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {MAQUINAS.map(m=> (
                <div key={m.id} className={`bg-white rounded-2xl border p-4 flex flex-col gap-3 ${m.estado==='completada'?'opacity-60':''}`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-[11px] px-2 py-1 rounded-full font-bold ${m.estado==='completada'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{m.estado==='completada'?'✓ COMPLETADA':'● PENDIENTE'}</span>
                    <span className="text-xs bg-slate-900 text-white px-2 py-1 rounded-full">{m.id}</span>
                  </div>
                  <div>
                    <p className="font-bold leading-tight">{m.nombre}</p>
                    <p className="text-xs text-slate-500">{m.direccion}</p>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-slate-100 px-2 py-1 rounded-full">❄️ {m.temp}</span>
                    <span className="bg-slate-100 px-2 py-1 rounded-full">📦 37 productos</span>
                  </div>
                  {m.estado==='completada' ? (
                    <button disabled className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-semibold text-sm">Visita registrada hoy</button>
                  ) : (
                    <button onClick={()=> iniciarVisita(m)} className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700">Iniciar visita →</button>
                  )}
                </div>
              ))}
            </div>

            {visitas.length>0 && (
              <div className="mt-6">
                <h3 className="font-bold mb-2">Historial con reporte WA</h3>
                <div className="bg-white rounded-2xl border overflow-hidden">
                  {visitas.slice(0,3).map(v=> (
                    <div key={v.id} className="p-3 border-b last:border-0 text-sm">
                      <div className="flex justify-between"><div><p className="font-semibold">{v.maquina.nombre}</p><p className="text-xs text-slate-500">{v.fecha} • {v.totalUnidades} u. • S/ {v.totalRecaudado.toFixed(2)}</p></div><a href={`https://wa.me/?text=${encodeURIComponent(v.textoWA)}`} target="_blank" rel="noreferrer" className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-full h-fit">WhatsApp ↗</a></div>
                      <pre className="text-xs bg-slate-50 border rounded-lg p-2 mt-2 whitespace-pre-wrap font-mono leading-tight">{v.textoWA}</pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {rol === 'operario' && maquinaActiva && (
          <div className="max-w-[560px] mx-auto">
            <div className="bg-white rounded-2xl border p-4 mb-4 sticky top-[64px] z-20">
              <div className="flex justify-between items-center">
                <button onClick={()=> setMaquinaActiva(null)} className="text-sm text-slate-500">← Volver</button>
                <span className="text-xs bg-slate-900 text-white px-2 py-1 rounded-full">Paso {paso}/5</span>
              </div>
              <p className="font-bold mt-2">{maquinaActiva.nombre}</p>
              <p className="text-xs text-slate-500">{maquinaActiva.id} • {new Date().toLocaleTimeString('es-PE')} • {totalUnidades} u. cargadas</p>
              <div className="flex gap-1.5 mt-3">
                {[1,2,3,4,5].map(n=> <div key={n} className={`h-1.5 flex-1 rounded-full ${paso>=n?'bg-emerald-500':'bg-slate-200'}`}></div>)}
              </div>
              <div className="flex justify-between text-[11px] mt-1 font-medium text-slate-500">
                <span className={paso===1?'text-emerald-600':''}>1.Temp</span>
                <span className={paso===2?'text-emerald-600':''}>2.Ventas</span>
                <span className={paso===3?'text-emerald-600 font-bold':''}>3.Reposición WA</span>
                <span className={paso===4?'text-emerald-600':''}>4.Fotos</span>
                <span className={paso===5?'text-emerald-600':''}>5.Dinero</span>
              </div>
            </div>

            {paso===1 && (
              <div className="space-y-3">
                <PhotoField label="Foto 1: Temperatura máquina" hint="Pantalla 'Hacer selección' - marca 15°C arriba izq (obligatorio)" value={form.tempFoto} onChange={v=> setForm({...form, tempFoto:v})} required ejemplo="Ejemplo real: 15°C con candado cerrado arriba der. + 'Bienvenido' abajo der. Botonera numérica iluminada."/>
                <div className="bg-white border rounded-xl p-3">
                  <label className="text-sm font-semibold">Temperatura registrada</label>
                  <div className="flex gap-2 mt-1"><input value={form.tempValor} onChange={e=> setForm({...form, tempValor: e.target.value})} placeholder="Ej: 15°C" className="flex-1 border rounded-lg px-3 py-2 text-sm"/><span className="text-xs bg-slate-100 px-3 py-2 rounded-lg">❄️</span></div>
                </div>
                <div className="bg-white border rounded-xl p-3">
                  <p className="text-sm font-semibold">¿Hubo error últimas 24h?</p>
                  <div className="flex gap-2 mt-2">
                    {['no','si'].map(v=> <button key={v} onClick={()=> setForm({...form, huboError:v})} className={`flex-1 py-2 rounded-xl text-sm font-semibold border ${form.huboError===v?'bg-slate-900 text-white border-slate-900':'bg-white border-slate-300'}`}>{v==='si'?'⚠️ Sí':'✓ No'}</button>)}
                  </div>
                  {form.huboError==='si' && (
                    <div className="mt-3 space-y-2">
                      <input value={form.errorDetalle} onChange={e=> setForm({...form, errorDetalle:e.target.value})} placeholder="Código error / descripción" className="w-full border rounded-lg px-3 py-2 text-sm"/>
                      <input value={form.errorSolucion} onChange={e=> setForm({...form, errorSolucion:e.target.value})} placeholder="Solución aplicada" className="w-full border rounded-lg px-3 py-2 text-sm"/>
                    </div>
                  )}
                </div>
                <button onClick={()=> setPaso(2)} disabled={!form.tempFoto} className={`w-full py-3 rounded-xl font-bold text-white ${!form.tempFoto?'bg-slate-300':'bg-slate-900'}`}>Siguiente → Ventas</button>
              </div>
            )}

            {paso===2 && (
              <div className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">📸 <b>3 fotos obligatorias</b> según el requerimiento: ventas HOY (parcial), ventas AYER (completo) y sencillero. Ejemplo ventas 2026-08-25: Total Sales 1 x $3.00, Cash $3.00, resto $0.00, botón Export Sales.</div>
                <PhotoField label="Foto 2: Registro ventas HOY" hint="Hasta la hora actual" value={form.ventasHoyFoto} onChange={v=> setForm({...form, ventasHoyFoto:v})} required ejemplo="Pantalla '2026-08-25' + Total Sales / Cash Sales $3.00 etc."/>
                <PhotoField label="Foto 3: Registro ventas AYER" hint="Día anterior completo" value={form.ventasAyerFoto} onChange={v=> setForm({...form, ventasAyerFoto:v})} required/>
                <PhotoField label="Foto 4: Sencillero / monedero" hint="Cajita que da vuelto" value={form.sencilleroFoto} onChange={v=> setForm({...form, sencilleroFoto:v})} required/>
                <div className="flex gap-2">
                  <button onClick={()=> setPaso(1)} className="flex-1 py-3 rounded-xl border font-semibold bg-white">← Atrás</button>
                  <button onClick={()=> setPaso(3)} disabled={!form.ventasHoyFoto || !form.ventasAyerFoto || !form.sencilleroFoto} className={`flex-1 py-3 rounded-xl font-bold text-white ${(!form.ventasHoyFoto || !form.ventasAyerFoto || !form.sencilleroFoto)?'bg-slate-300':'bg-slate-900'}`}>Siguiente → Reposición</button>
                </div>
              </div>
            )}

            {paso===3 && (
              <div className="space-y-3">
                <div className="bg-white border rounded-xl p-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="font-bold text-sm">Lista de productos ingresados</p>
                      <p className="text-xs text-slate-500">Como lo mandas por WhatsApp. Solo los con valor aparecen en el reporte.</p>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-bold">{totalUnidades} u.</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button onClick={aplicarEjemplo} className="flex-1 text-xs bg-amber-100 border border-amber-300 text-amber-900 py-2 rounded-xl font-semibold">↻ Cargar ejemplo (47 u.)</button>
                    <button onClick={limpiarCantidades} className="px-3 text-xs border rounded-xl">Limpiar</button>
                  </div>

                  <div className="flex gap-1.5 mt-3 overflow-auto pb-1">
                    {categorias.map(c=> <button key={c} onClick={()=> setFiltroCat(c)} className={`text-xs px-3 py-1.5 rounded-full border shrink-0 ${filtroCat===c?'bg-slate-900 text-white border-slate-900':'bg-white text-slate-600'}`}>{c}</button>)}
                  </div>

                  <div className="mt-3 space-y-2 max-h-[420px] overflow-auto pr-1">
                    {productosFiltrados.map((p)=>{
                      const idx = form.productos.findIndex(x=>x.sku===p.sku)
                      return (
                      <div key={p.sku} className={`flex items-center gap-2 border rounded-xl p-2 ${p.reponer>0?'bg-emerald-50 border-emerald-200':'bg-white'}`}>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-none truncate">{p.nombre} <span className="font-normal text-xs text-slate-500">• {p.cat}</span></p>
                          <p className="text-[11px] text-slate-500">Ingresados: <b className={p.reponer>0?'text-emerald-700':'text-slate-900'}>{p.reponer}</b> {p.reponer>0 && '→ saldrá en WA'}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button onClick={()=> { const cp=[...form.productos]; cp[idx].reponer=Math.max(0,cp[idx].reponer-1); setForm({...form, productos:cp})}} className="w-8 h-8 rounded-lg border bg-white">−</button>
                          <span className="w-7 text-center font-black text-sm">{p.reponer}</span>
                          <button onClick={()=> { const cp=[...form.productos]; cp[idx].reponer=Math.min(99,cp[idx].reponer+1); setForm({...form, productos:cp})}} className="w-8 h-8 rounded-lg bg-slate-900 text-white">+</button>
                        </div>
                      </div>
                      )
                    })}
                  </div>

                  {/* PREVIEW WHATSAPP */}
                  <div className="mt-4 border-2 border-green-200 bg-green-50 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-black text-green-800">💬 Vista previa WhatsApp</p>
                      <span className="text-[11px] text-green-700">{productosConCantidad.length} líneas</span>
                    </div>
                    <pre className="text-xs bg-white border rounded-lg p-2.5 mt-2 whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-auto">{textoWA}</pre>
                    <div className="flex gap-2 mt-2">
                      <button onClick={copiarWA} className="flex-1 py-2 rounded-xl bg-white border font-semibold text-sm">📋 Copiar</button>
                      <button onClick={enviarWA} className="flex-1 py-2 rounded-xl bg-green-600 text-white font-bold text-sm">Enviar WA ↗</button>
                    </div>
                    <p className="text-[11px] text-green-700 mt-1 text-center">Se abre WhatsApp con el texto listo para enviar al grupo del almacén</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=> setPaso(2)} className="flex-1 py-3 rounded-xl border font-semibold bg-white">← Atrás</button>
                  <button onClick={()=> setPaso(4)} className="w-full flex-1 py-3 rounded-xl bg-slate-900 text-white font-bold">Siguiente → Fotos finales</button>
                </div>
              </div>
            )}

            {paso===4 && (
              <div className="space-y-3">
                <PhotoField label="Foto 5: Máquina llena (stock completo)" hint="Vista frontal bandejas llenas" value={form.stockFoto} onChange={v=> setForm({...form, stockFoto:v})} required/>
                <PhotoField label="Foto 6: Almacén lateral Izq" hint="Pequeño almacén costado" value={form.almacenIzqFoto} onChange={v=> setForm({...form, almacenIzqFoto:v})} />
                <PhotoField label="Foto 7: Almacén lateral Der" hint="Pequeño almacén costado" value={form.almacenDerFoto} onChange={v=> setForm({...form, almacenDerFoto:v})} />
                <div className="flex gap-2">
                  <button onClick={()=> setPaso(3)} className="flex-1 py-3 rounded-xl border font-semibold bg-white">← Atrás</button>
                  <button onClick={()=> setPaso(5)} disabled={!form.stockFoto} className={`flex-1 py-3 rounded-xl font-bold text-white ${!form.stockFoto?'bg-slate-300':'bg-slate-900'}`}>Siguiente → Dinero</button>
                </div>
              </div>
            )}

            {paso===5 && (
              <div className="space-y-3">
                <div className="bg-white border rounded-xl p-4">
                  <p className="font-bold">Recaudación y cierre</p>
                  <p className="text-xs text-slate-500">Saca billetes y monedas, en bolsita, deja en casa.</p>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <label className="text-sm">Billetes S/
                      <input type="number" value={form.billetes} onChange={e=> setForm({...form, billetes:e.target.value})} placeholder="0.00" className="w-full border rounded-xl px-3 py-2.5 mt-1" />
                    </label>
                    <label className="text-sm">Monedas S/
                      <input type="number" value={form.monedas} onChange={e=> setForm({...form, monedas:e.target.value})} placeholder="0.00" className="w-full border rounded-xl px-3 py-2.5 mt-1" />
                    </label>
                  </div>
                  <div className="mt-3 bg-slate-900 text-white rounded-xl p-3 flex justify-between items-center">
                    <span className="text-sm opacity-80">Total a entregar</span><span className="text-xl font-black">S/ {totalDinero}</span>
                  </div>
                  <label className="text-sm mt-3 block">Observación
                    <textarea value={form.observacion} onChange={e=> setForm({...form, observacion:e.target.value})} placeholder="Ej: Máquina pidió reposición..." className="w-full border rounded-xl px-3 py-2 mt-1 text-sm" rows={2}></textarea>
                  </label>
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
                    <p className="text-xs font-bold text-green-800">Reporte que se enviará:</p>
                    <pre className="text-xs bg-white border rounded p-2 mt-1 whitespace-pre-wrap font-mono">{textoWA.slice(0,300)}</pre>
                    <div className="flex gap-2 mt-2">
                      <button onClick={copiarWA} className="flex-1 text-xs border bg-white py-1.5 rounded-full">Copiar</button>
                      <button onClick={enviarWA} className="flex-1 text-xs bg-green-600 text-white py-1.5 rounded-full">WA</button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=> setPaso(4)} className="flex-1 py-3 rounded-xl border font-semibold bg-white">← Atrás</button>
                  <button onClick={guardarVisita} className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700">✓ Cerrar + Guardar</button>
                </div>
                <p className="text-center text-[11px] text-slate-500">Queda guardado local y el texto WA queda en historial para reenviar</p>
              </div>
            )}
          </div>
        )}

        {rol === 'almacen' && (
          <div className="max-w-[900px] mx-auto space-y-4">
            <div className="bg-white border rounded-2xl p-4">
              <h2 className="font-black text-lg">Control de Almacén • NUEVO LOCAL</h2>
              <p className="text-sm text-slate-500">Entrega exacta diaria • Texto WA = comprobante oficial</p>
              <div className="mt-3 grid md:grid-cols-2 gap-3">
                <div className="bg-slate-900 text-white rounded-xl p-3">
                  <p className="text-xs opacity-70">Mochila #14 • 06:10 hoy</p>
                  <p className="font-bold">{totalUnidades || 47} productos asignados</p>
                  <p className="text-xs opacity-70">Operario → Almacén</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-xs font-bold text-green-800">Último reporte WA recibido</p>
                  <pre className="text-xs font-mono bg-white border rounded p-2 mt-1 whitespace-pre-wrap">{visitas[0]?.textoWA || textoWA}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {rol === 'admin' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-3">
              <div className="bg-white border rounded-2xl p-4"><p className="text-xs text-slate-500">Visitas hoy</p><p className="text-2xl font-black">{visitas.length}</p></div>
              <div className="bg-white border rounded-2xl p-4"><p className="text-xs text-slate-500">Unidades ingresadas</p><p className="text-2xl font-black">{visitas.reduce((a,b)=>a+b.totalUnidades,0)}</p></div>
              <div className="bg-white border rounded-2xl p-4"><p className="text-xs text-slate-500">Recaudado</p><p className="text-2xl font-black">S/ {visitas.reduce((a,b)=>a+b.totalRecaudado,0).toFixed(2)}</p></div>
              <div className="bg-white border rounded-2xl p-4"><p className="text-xs text-slate-500">Fotos</p><p className="text-2xl font-black">{visitas.length*7}/{(visitas.length*7)||0}</p></div>
            </div>
            <div className="bg-white border rounded-2xl p-4">
              <h3 className="font-bold">Historial con reportes WA</h3>
              {visitas.length===0 ? <p className="text-sm text-slate-500 py-8 text-center border border-dashed rounded-xl">Sin visitas. Inicia una como Operario y prueba el reporte WA.</p> : (
                <div className="space-y-3 mt-3">
                  {visitas.map(v=> (
                    <div key={v.id} className="border rounded-xl p-3">
                      <div className="flex justify-between gap-2">
                        <div><p className="font-semibold text-sm">{v.maquina.nombre}</p><p className="text-xs text-slate-500">{v.fecha} • {v.totalUnidades} u. • S/ {v.totalRecaudado.toFixed(2)} • {v.form.tempValor}</p></div>
                        <a href={`https://wa.me/?text=${encodeURIComponent(v.textoWA)}`} target="_blank" rel="noreferrer" className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-full h-fit shrink-0">Reenviar WA</a>
                      </div>
                      <pre className="text-xs bg-slate-50 border rounded-lg p-2 mt-2 whitespace-pre-wrap font-mono">{v.textoWA}</pre>
                      <details className="mt-2"><summary className="text-xs text-slate-500 cursor-pointer">ver fotos ({Object.values(v.form).filter(x=> typeof x==='string' && x.startsWith('data:')).length})</summary><div className="grid grid-cols-3 gap-2 mt-2">{[['Temp',v.form.tempFoto],['Ventas hoy',v.form.ventasHoyFoto],['Ventas ayer',v.form.ventasAyerFoto],['Sencillero',v.form.sencilleroFoto],['Stock',v.form.stockFoto]].map(([l,src])=> src && <img key={l} src={src} className="h-20 w-full object-cover rounded border" alt={l}/>)}</div></details>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <footer className="text-center text-[11px] text-slate-400 py-6">Prototipo local • React + Vite • {new Date().getFullYear()} • Reporte WA integrado • {CATALOGO_REAL.length} SKUs</footer>
      {toast && <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50">{toast}</div>}
    </div>
  )
}
