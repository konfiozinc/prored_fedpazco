document.addEventListener('DOMContentLoaded', () => {
            const qrBox = document.getElementById("qrcode");
            if(qrBox) {
                new QRCode(qrBox, {
                    text: window.location.href,
                    width: 130,
                    height: 130,
                    colorDark : "#0B0F19",
                    colorLight : "#ffffff"
                });
            }

            const toast = document.getElementById('toast');
            const showToast = (msg) => {
                toast.textContent = msg;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2200);
            };

            // Modal QR Lógica
            const modalQr = document.getElementById('modal-qr');
            document.getElementById('btn-qr').addEventListener('click', () => modalQr.classList.add('active'));
            document.getElementById('close-qr').addEventListener('click', () => modalQr.classList.remove('active'));
            modalQr.addEventListener('click', (e) => { if(e.target === modalQr) modalQr.classList.remove('active'); });

            // Generador de vCard Nativo
            document.getElementById('btn-vcard').addEventListener('click', () => {
                const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:PRORED - FEDPAZCO\nORG:Fundación FEDPAZCO\nTITLE:Ecosistema Profesional\nTEL;TYPE=CELL:+573108172929\nNOTE:Emprendimiento, Desarrollo y Paz del Pacífico Colombiano.\nURL:${window.location.href}\nEND:VCARD`;
                const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'PRORED_FEDPAZCO.vcf';
                a.click();
                URL.revokeObjectURL(url);
                showToast('Contacto guardado en agenda');
            });
        });
