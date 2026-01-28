#!/bin/bash

# Script para crear receta de ejemplo

curl -X POST http://76.13.25.51/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "DrMiranda2026!"
  }' \
  -c cookies.txt

echo -e "\n\n=== Creando receta de ejemplo ===\n"

curl -X POST http://76.13.25.51/api/recetas \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "paciente_nombre": "María Fernanda González López",
    "paciente_edad": 20,
    "fecha_consulta": "2026-01-28",
    "diagnostico": "Síndrome de Ovario Poliquístico (SOP). Paciente femenina de 20 años con diagnóstico desde los 16 años sin tratamiento previo. Presenta 3 quistes en ovario izquierdo y 1 en ovario derecho de 2mm cada uno. Sintomatología: cólicos menstruales intensos, dolor lumbar constante, cefaleas severas y descontrol hormonal grave.",
    "medicamentos": [
      {
        "nombre": "Inofolic (Myo-Inositol + Ácido Fólico)",
        "dosis": "1 sobre (2g myo-inositol + 200mcg ácido fólico)",
        "frecuencia": "2 veces al día (mañana y noche)",
        "duracion": "3 meses continuos"
      },
      {
        "nombre": "Metformina",
        "dosis": "850mg",
        "frecuencia": "2 veces al día con alimentos",
        "duracion": "3 meses (evaluar continuidad)"
      },
      {
        "nombre": "Anticonceptivos Orales Combinados (Etinilestradiol 30mcg + Drospirenona 3mg)",
        "dosis": "1 tableta",
        "frecuencia": "1 vez al día a la misma hora",
        "duracion": "Ciclos de 21 días con 7 días de descanso"
      },
      {
        "nombre": "Espironolactona",
        "dosis": "50mg",
        "frecuencia": "1 vez al día por la mañana",
        "duracion": "3 meses"
      },
      {
        "nombre": "Ibuprofeno",
        "dosis": "400mg",
        "frecuencia": "Cada 8 horas en caso de dolor (máximo 3 veces al día)",
        "duracion": "Solo durante episodios de dolor"
      },
      {
        "nombre": "Complejo B (B1, B6, B12)",
        "dosis": "1 tableta",
        "frecuencia": "1 vez al día con el desayuno",
        "duracion": "3 meses"
      },
      {
        "nombre": "Vitamina D3",
        "dosis": "2000 UI",
        "frecuencia": "1 vez al día",
        "duracion": "3 meses"
      },
      {
        "nombre": "Omega 3 (EPA + DHA)",
        "dosis": "1000mg",
        "frecuencia": "1 vez al día con alimentos",
        "duracion": "3 meses"
      }
    ],
    "indicaciones": "INDICACIONES GENERALES:\n\n1. DIETA: Seguir dieta baja en carbohidratos refinados y azúcares. Aumentar consumo de vegetales, proteínas magras y grasas saludables. Evitar alimentos procesados.\n\n2. EJERCICIO: Realizar actividad física moderada 30-45 minutos, 5 días a la semana (caminar, nadar, yoga).\n\n3. CONTROL DE PESO: Mantener peso saludable. Pérdida de 5-10% del peso corporal puede mejorar significativamente los síntomas.\n\n4. HIDRATACIÓN: Tomar mínimo 2 litros de agua al día.\n\n5. SUEÑO: Dormir 7-8 horas diarias en horario regular.\n\n6. SEGUIMIENTO: Cita de control en 1 mes para evaluar respuesta al tratamiento. Realizar estudios de laboratorio (perfil hormonal, glucosa, insulina) antes de la próxima consulta.\n\n7. EFECTOS SECUNDARIOS: La Metformina puede causar molestias gastrointestinales los primeros días (tomar con alimentos). Si presenta efectos adversos severos, contactar inmediatamente.\n\n8. IMPORTANTE: No suspender tratamiento sin indicación médica. La constancia es clave para el control del SOP.\n\nEn caso de emergencia o dudas, comunicarse al consultorio."
  }' | python3 -m json.tool

rm cookies.txt

echo -e "\n\n=== Receta creada exitosamente ==="
