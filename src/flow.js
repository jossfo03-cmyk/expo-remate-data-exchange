export const getNextScreen = async (decryptedBody) => {

  const { action, screen, data, flow_token } = decryptedBody;

  // Health Check
  if (action === "ping") {
    return {
      data: {
        status: "active"
      }
    };
  }

  // Cuando el usuario abre el Flow
  if (action === "INIT") {
    return {
      screen: "EXPO_REMATE",
      data: {}
    };
  }

  // Cuando presiona "Confirmar mi asistencia"
  if (action === "data_exchange") {

    if (screen === "EXPO_REMATE") {

      const payload = {
        evento: "Expo Remate Julio 2026",
        asistencia: data.asistencia,
        nombre: data.nombre,
        apellido: data.apellido,
        empresa: data.empresa,
        cargo: data.cargo,
        telefono: data.telefono,
        correo: data.correo,
        acompanante: data.acompanante,
        nombre_acompanante: data.nombre_acompanante,
        motivo: data.motivo,
        fuente: data.fuente
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbzuOiixqISWfL5Ly-H6MH0GPXVMshsTycmiLC1fQRDbM6XJ_6UpR597lzgFOMQHCSunig/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      return {
        screen: "SUCCESS",
        data: {
          extension_message_response: {
            params: {
              flow_token
            }
          }
        }
      };

    }

  }

  throw new Error("Unhandled request");

};
