import { http } from "./http"

export async function listarProfessores() {
    const response = await http.get("/professores")
    return response.data
}

export async function criarProfessor(payload) {
    const response = await http.post("/professores", payload)
    return response.data
}

export async function buscarProfessorPorId(id) {
    const response = await http.get(`/professores/${id}`)
    return response.data
}

export async function atualizarProfessor(id, payload) {
    const response = await http.put(`/professores/${id}`, payload)
    return response.data
}

export async function deletarProfessor(id) {
    await http.delete(`/professores/${id}`)
}
