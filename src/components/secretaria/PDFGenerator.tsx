
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { MemberType } from "@/types/member";

interface PDFGeneratorProps {
  members: MemberType[];
}

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "white",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1d4ed8",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1e293b",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#f8fafc",
    padding: 5,
    color: "#0f172a",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: "40%",
    fontSize: 10,
    fontWeight: "bold",
    color: "#334155",
  },
  value: {
    width: "60%",
    fontSize: 10,
    color: "#475569",
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
    fontSize: 8,
    color: "#94a3b8",
    textAlign: "center",
  },
  signature: {
    marginTop: 50,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopStyle: "dotted",
    borderTopColor: "#cbd5e1",
    width: "60%",
    marginLeft: "20%",
    textAlign: "center",
    fontSize: 10,
    color: "#475569",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 20,
    right: 30,
    color: "#94a3b8",
  },
});

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ members }) => {
  return (
    <Document>
      {members.map((member) => (
        <Page size="A4" style={styles.page} key={member.id}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Club Comando Celeste</Text>
              <Text style={styles.headerSubtitle}>Modulo di registrazione {member.memberType === "bambini" ? "Bambino" : member.memberType === "animatori" ? "Animatore" : "Accompagnatore"}</Text>
            </View>
            {/* <Image style={styles.logo} src="/lovable-uploads/a7a65f60-faab-465f-a5cf-09cf39dde5c0.png" /> */}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informazioni Personali</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Nome e Cognome:</Text>
              <Text style={styles.value}>{member.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{member.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Data di Nascita:</Text>
              <Text style={styles.value}>{member.birthDate ? new Date(member.birthDate).toLocaleDateString('it-IT') : "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Luogo di Nascita:</Text>
              <Text style={styles.value}>{member.birthPlace || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Indirizzo:</Text>
              <Text style={styles.value}>{member.address || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Telefono:</Text>
              <Text style={styles.value}>{member.phone || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Codice Fiscale:</Text>
              <Text style={styles.value}>{member.fiscalCode || "-"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Unità:</Text>
              <Text style={styles.value}>{member.unitName || "-"}</Text>
            </View>
          </View>

          {member.memberType === "bambini" && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informazioni di Salute</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Gruppo Sanguigno:</Text>
                  <Text style={styles.value}>{member.bloodType || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Segue un trattamento medico?</Text>
                  <Text style={styles.value}>{member.followsMedicalTreatment ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Allergie:</Text>
                  <Text style={styles.value}>{member.allergies || "Nessuna"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Dettagli Allergie:</Text>
                  <Text style={styles.value}>{member.allergyDetails || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Farmaci:</Text>
                  <Text style={styles.value}>{member.medications || "Nessuno"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Note Mediche:</Text>
                  <Text style={styles.value}>{member.healthNotes || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Difficoltà di Salute:</Text>
                  <Text style={styles.value}>{member.healthDifficulties || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Raccomandazioni dai Genitori:</Text>
                  <Text style={styles.value}>{member.parentRecommendations || "-"}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Malattie Pregresse</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Rosolia:</Text>
                  <Text style={styles.value}>{member.illnesses?.rosolia ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Varicella:</Text>
                  <Text style={styles.value}>{member.illnesses?.varicella ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Angina:</Text>
                  <Text style={styles.value}>{member.illnesses?.angina ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Febbre Reumatica:</Text>
                  <Text style={styles.value}>{member.illnesses?.febbreReumatica ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Scarlattina:</Text>
                  <Text style={styles.value}>{member.illnesses?.scarlattina ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Pertosse:</Text>
                  <Text style={styles.value}>{member.illnesses?.pertosse ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Otite:</Text>
                  <Text style={styles.value}>{member.illnesses?.otite ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Morbillo:</Text>
                  <Text style={styles.value}>{member.illnesses?.morbillo ? "Sì" : "No"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Parotite:</Text>
                  <Text style={styles.value}>{member.illnesses?.parotite ? "Sì" : "No"}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Informazioni Genitore/Tutore</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Nome e Cognome:</Text>
                  <Text style={styles.value}>{member.parentName || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Indirizzo:</Text>
                  <Text style={styles.value}>{member.parentAddress || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Codice Fiscale:</Text>
                  <Text style={styles.value}>{member.parentFiscalCode || "-"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Telefono:</Text>
                  <Text style={styles.value}>{member.parentPhone || "-"}</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Autorizzazioni</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Trattamento Dati:</Text>
                  <Text style={styles.value}>{member.dataProcessingConsent ? "Autorizzato" : "Non autorizzato"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Foto e Video:</Text>
                  <Text style={styles.value}>{member.photoConsent ? "Autorizzato" : "Non autorizzato"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Foto e Video A.I.S.A:</Text>
                  <Text style={styles.value}>{member.aisaPhotoConsent ? "Autorizzato" : "Non autorizzato"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Gite ed Escursioni:</Text>
                  <Text style={styles.value}>{member.tripConsent ? "Autorizzato" : "Non autorizzato"}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Trattamento Medico:</Text>
                  <Text style={styles.value}>{member.medicalTreatmentConsent ? "Autorizzato" : "Non autorizzato"}</Text>
                </View>
              </View>
            </>
          )}

          {member.memberType !== "bambini" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informazioni Documento</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Tipo di Documento:</Text>
                <Text style={styles.value}>
                  {member.documentType === "cartaIdentita" 
                    ? "Carta d'identità" 
                    : member.documentType === "patente" 
                      ? "Patente" 
                      : member.documentType === "passaporto" 
                        ? "Passaporto" 
                        : "-"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Numero Documento:</Text>
                <Text style={styles.value}>{member.documentNumber || "-"}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Rilasciato da:</Text>
                <Text style={styles.value}>{member.issuedBy || "-"}</Text>
              </View>
            </View>
          )}

          <View style={styles.signature}>
            <Text>Firma</Text>
            <Text>_________________________________</Text>
            <Text style={{ marginTop: 10 }}>Data: {new Date().toLocaleDateString('it-IT')}</Text>
          </View>

          <View style={styles.footer}>
            <Text>Club Comando Celeste - Documento generato il {new Date().toLocaleDateString('it-IT')} alle {new Date().toLocaleTimeString('it-IT')}</Text>
          </View>

          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </Page>
      ))}
    </Document>
  );
};

export default PDFGenerator;
