import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { User } from 'lucide-react';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await api.get('/users/students');
        setStudents(response.data);
      } catch (err) {
        console.error("Erro ao carregar alunos", err);
      }
    }
    loadStudents();
  }, []);

  return (
    <div className="bg-[#131313] border border-white/5 rounded-3xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tighter">Sua Tropa</h3>
      <div className="space-y-4">
        {students.length > 0 ? students.map(student => (
          <div key={student.id} className="flex items-center justify-between p-4 bg-[#0e0e0e] rounded-2xl border border-white/5 hover:border-[#8eff71]/20 transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden border border-white/10">
                {student.profile?.avatarUrl ? (
                  <img src={student.profile.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="text-gray-600" size={20} />
                )}
              </div>
              <div>
                <h4 className="text-white font-bold group-hover:text-[#8eff71] transition-colors">{student.name}</h4>
                <p className="text-xs text-gray-500">{student.email}</p>
              </div>
            </div>
          </div>
        )) : (
          <p className="text-gray-600 text-sm italic">Nenhum aluno vinculado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;