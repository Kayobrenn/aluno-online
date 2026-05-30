import ProfessorForm from "../components/ProfessorForm"
import { useEffect, useMemo, useState } from "react"
import {
    listarProfessores,
    criarProfessor,
    buscarProfessorPorId,
    atualizarProfessor,
    deletarProfessor
} from "../api/professores"

export default function ProfessoresPage() {
    const [professores, setProfessores] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [erroPagina, setErroPagina] = useState("")
    const [erroModal, setErroModal] = useState("")
    const [sucesso, setSucesso] = useState("")

    const [nomeCompleto, setNomeCompleto] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [editandoId, setEditandoId] = useState(null)
    const [salvando, setSalvando] = useState(false)

    const [filtroId, setFiltroId] = useState("")
    const [professorEncontrado, setProfessorEncontrado] = useState(null)
    const [msg, setMsg] = useState("")

    const [pagina, setPagina] = useState(1)
    const pageSize = 5

    const [modalAberto, setModalAberto] = useState(false)

    const listaBase = useMemo(
        () => (professorEncontrado ? [professorEncontrado] : professores),
        [professorEncontrado, professores]
    )

    const total = listaBase.length
    const totalPaginas = Math.max(1, Math.ceil(total / pageSize))
    const inicio = (pagina - 1) * pageSize
    const paginaAtual = listaBase.slice(inicio, inicio + pageSize)

    useEffect(() => {
        if (pagina > totalPaginas) setPagina(totalPaginas)
    }, [totalPaginas, pagina])

    useEffect(() => {
        carregar()
    }, [])

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Escape") fecharModal()
        }
        if (modalAberto) document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [modalAberto])

    async function carregar() {
        try {
            setCarregando(true)
            setErroPagina("")
            const data = await listarProfessores()
            setProfessores(Array.isArray(data) ? data : [])
        } catch {
            setErroPagina("Falha ao buscar professores, tente novamente!")
        } finally {
            setCarregando(false)
        }
    }

    async function handleBuscarPorId() {
        setMsg("")
        const id = filtroId.trim()

        if (!id) {
            setMsg("Informe um ID para buscar.")
            return
        }
        if (!/^\d+$/.test(id)) {
            setMsg("ID deve conter apenas números.")
            return
        }

        try {
            setCarregando(true)
            const professor = await buscarProfessorPorId(id)
            setProfessorEncontrado(professor)
            setPagina(1)
        } catch {
            setProfessorEncontrado(null)
            setMsg("Professor não encontrado.")
        } finally {
            setCarregando(false)
        }
    }

    function handleLimparBusca() {
        setFiltroId("")
        setProfessorEncontrado(null)
        setMsg("")
        setPagina(1)
    }

    function abrirModalNovo() {
        setEditandoId(null)
        setNomeCompleto("")
        setEmail("")
        setCpf("")
        setErroModal("")
        setMsg("")
        setModalAberto(true)
    }

    function validarFormulario() {
        if (!nomeCompleto.trim()) return "Nome completo é obrigatório."
        if (!email.trim()) return "Email é obrigatório."
        if (!email.includes("@")) return "Email inválido."
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.trim()))
            return "CPF inválido. Use o formato 000.000.000-00."
        return ""
    }

    async function abrirModalEditar(id) {
        try {
            setErroModal("")
            const professor = await buscarProfessorPorId(id)
            setEditandoId(id)
            setNomeCompleto(professor.nomeCompleto ?? "")
            setEmail(professor.email ?? "")
            setCpf(professor.cpf ?? "")
            setModalAberto(true)
        } catch {
            setErroModal("Não foi possível carregar o professor para edição.")
        }
    }

    async function excluirProfessor(id, nome) {
        const ok = confirm(`Excluir o professor ${nome}?`)
        if (!ok) return

        try {
            setErroPagina("")
            setSucesso("")
            await deletarProfessor(id)
            await carregar()
            setSucesso("Professor excluído!")
            setTimeout(() => setSucesso(""), 2000)
        } catch {
            setErroPagina("Não consegui excluir o professor.")
        }
    }

    function fecharModal() {
        setModalAberto(false)
        setEditandoId(null)
        setNomeCompleto("")
        setEmail("")
        setCpf("")
        setErroModal("")
    }

    return (
        <div style={{ padding: 16, fontFamily: "Arial" }}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Gerenciamento de Professores
                </h1>

                <button
                    type="button"
                    onClick={abrirModalNovo}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-800 px-3 py-2 text-white hover:bg-slate-700"
                >
                    <span className="text-lg leading-none">+</span>
                    <span>Novo professor</span>
                </button>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow p-4 flex flex-col gap-3">
                <div className="flex gap-3 items-end">
                    <div className="flex flex-col gap-1 w-40">
                        <label className="text-sm text-slate-600">ID</label>
                        <input
                            value={filtroId}
                            onChange={(e) => setFiltroId(e.target.value)}
                            placeholder="Ex: 10"
                            inputMode="numeric"
                            className="border rounded-lg px-3 py-2"
                        />
                    </div>

                    <button
                        onClick={handleBuscarPorId}
                        className="px-4 py-2 rounded-lg bg-sky-800 text-white hover:bg-slate-700"
                    >
                        Buscar
                    </button>

                    <button
                        onClick={handleLimparBusca}
                        className="px-4 py-2 rounded-lg border hover:bg-slate-50"
                    >
                        Limpar
                    </button>
                </div>

                {msg && <div className="text-sm text-slate-700 bg-slate-100 rounded-lg px-3 py-2">{msg}</div>}
            </div>

            {!carregando && !erroPagina && (
                <div className="mt-6 bg-white rounded-xl shadow p-4">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="border-b">
                            <th className="py-3 px-2 w-20">ID</th>
                            <th className="py-3 px-10">Nome completo</th>
                            <th className="py-3 px-20">Email</th>
                            <th className="py-3 px-2 w-44 text-center">CPF</th>
                            <th className="py-3 px-2 w-28 text-center">Ações</th>
                        </tr>
                        </thead>

                        <tbody>
                        {paginaAtual.map((p) => (
                            <tr key={p.id} className="border-b">
                                <td className="py-3 px-2">{p.id}</td>
                                <td className="py-3 px-2">{p.nomeCompleto}</td>
                                <td className="py-3 px-2">{p.email}</td>
                                <td className="py-3 px-2 text-center">{p.cpf}</td>
                                <td className="py-3 px-2 text-center">
                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => abrirModalEditar(p.id)} className="text-blue-600">✏️</button>
                                        <button onClick={() => excluirProfessor(p.id, p.nomeCompleto)} className="text-red-600">❌</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalAberto && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center" onClick={fecharModal}>
                    <div className="bg-white p-6 rounded-xl w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-semibold mb-4">
                            {editandoId ? "Editar professor" : "Cadastrar professor"}
                        </h2>

                        <ProfessorForm
                            editandoId={editandoId}
                            nomeCompleto={nomeCompleto}
                            email={email}
                            cpf={cpf}
                            setNomeCompleto={setNomeCompleto}
                            setEmail={setEmail}
                            setCpf={setCpf}
                            salvando={salvando}
                            erro={erroModal}
                            onCancelar={fecharModal}
                            onSubmit={async (e) => {
                                e.preventDefault()

                                const erro = validarFormulario()
                                if (erro) {
                                    setErroModal(erro)
                                    return
                                }

                                setSalvando(true)
                                try {
                                    if (editandoId) {
                                        await atualizarProfessor(editandoId, { nomeCompleto, email, cpf })
                                    } else {
                                        await criarProfessor({ nomeCompleto, email, cpf })
                                    }
                                    await carregar()
                                    fecharModal()
                                } finally {
                                    setSalvando(false)
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
