"""Gera os quatro mapas mentais e a coletânea com os mesmos conteúdos e fontes."""
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'mind-maps'
OUT.mkdir(parents=True, exist_ok=True)
# Fontes com acentuação; ajuste os caminhos se gerar fora do Windows.
pdfmetrics.registerFont(TTFont('Arial', r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold', r'C:\Windows\Fonts\arialbd.ttf'))
GUIDE = 'https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/'
MAPS = [
    dict(slug='seguranca', title='Arquiteturas seguras', weight='30%', color='#E11D48', center=['SEGURANÇA', 'Quem pode acessar?'], branches=[
        ('Identidade e acesso', ['IAM: menor privilégio e MFA.', 'Roles e STS: acesso temporário entre contas.']),
        ('Proteção de aplicações', ['WAF, Shield, Cognito e Secrets Manager.', 'Escolha conforme a ameaça e a identidade.']),
        ('Proteção dos dados', ['KMS em repouso; TLS em trânsito.', 'Revise políticas de chave e retenção.']),
        ('Rede segmentada', ['Separe sub-redes públicas e privadas.', 'Avalie rotas, endpoints, SGs e NACLs.']),
        ('Security groups', ['Stateful: respostas de conexões permitidas retornam.', 'Regras liberam tráfego; não há deny explícito.']),
        ('Governança', ['SCPs limitam permissões em contas membro.', 'Políticas de recurso complementam o IAM.']),
    ], decision='Antes de escolher um serviço, identifique o principal, a ação, o recurso e a ameaça.', sources=[('Guia AWS - domínio 1', GUIDE+'solutions-architect-associate-03-domain1.html'), ('Security groups', 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html')]),
    dict(slug='resiliencia', title='Arquiteturas resilientes', weight='26%', color='#0284C7', center=['RESILIÊNCIA', 'Como continuar operando?'], branches=[
        ('Desacoplamento', ['Filas, eventos e publicação/assinatura.', 'SQS, SNS e Step Functions.']),
        ('Escalabilidade', ['Auto Scaling e balanceamento de carga.', 'Evite pontos únicos de falha.']),
        ('Estado e dados', ['Avalie aplicações stateless e stateful.', 'Planeje backups, replicação e restauração.']),
        ('RDS Multi-AZ', ['Uma standby síncrona em outra AZ.', 'Nesse modelo, standby não atende leituras.']),
        ('Recuperação de desastres', ['RPO: perda de dados tolerável.', 'RTO: tempo tolerável para recuperar.']),
        ('Estratégias de DR', ['Backup/restore, pilot light, warm standby.', 'Active-active: avalie complexidade e custo.']),
    ], decision='Compare falha de instância, de AZ e de Região. Teste a recuperação, não apenas o backup.', sources=[('Guia AWS - domínio 2', GUIDE+'solutions-architect-associate-03-domain2.html'), ('RDS Multi-AZ', 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html'), ('Estratégias de DR', 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html')]),
    dict(slug='desempenho', title='Arquiteturas de alto desempenho', weight='24%', color='#D97706', center=['DESEMPENHO', 'Onde está o gargalo?'], branches=[
        ('Armazenamento', ['Objetos, arquivos e blocos.', 'Compare S3, EFS, EBS e soluções híbridas.']),
        ('Computação elástica', ['EC2, Lambda, Fargate, Batch e EMR.', 'Dimensione memória, CPU e concorrência.']),
        ('Bancos de dados', ['Relacional, não relacional ou em memória.', 'Avalie conexões, capacidade e réplicas.']),
        ('Cache', ['Considere ElastiCache e cache na borda.', 'Leia o padrão de acesso antes de escolher.']),
        ('Rede global e híbrida', ['CloudFront e Global Accelerator.', 'VPN, Direct Connect e PrivateLink.']),
        ('Ingestão e transformação', ['Kinesis, Glue, Athena e DataSync.', 'Avalie tamanho, frequência e velocidade.']),
    ], decision='Separe latência, throughput, IOPS e conexões. Selecione o recurso pelo requisito limitante.', sources=[('Guia AWS - domínio 3', GUIDE+'solutions-architect-associate-03-domain3.html')]),
    dict(slug='custos', title='Arquiteturas com custos otimizados', weight='20%', color='#059669', center=['CUSTOS', 'Qual é o custo total?'], branches=[
        ('Capacidade de computação', ['Compare Spot, reservas e Savings Plans.', 'Ajuste família, tamanho e utilização.']),
        ('Operação', ['Escalamento e desligamento programado.', 'Compare soluções gerenciadas e serverless.']),
        ('Bancos e retenção', ['Dimensione capacidade e backups.', 'Avalie cache e padrão de acesso.']),
        ('S3 e ciclo de vida', ['Escolha a classe pelo acesso e recuperação.', 'Intelligent-Tiering para acesso variável.']),
        ('Rede e transferência', ['Considere volume, localização e tráfego.', 'Compare alternativas híbridas e de migração.']),
        ('Visibilidade financeira', ['Cost Explorer, Budgets e tags.', 'Estime armazenamento, requisições e transferência.']),
    ], decision='Menor custo não significa menor preço por unidade: inclua disponibilidade, recuperação e operação.', sources=[('Guia AWS - domínio 4', GUIDE+'solutions-architect-associate-03-domain4.html'), ('Classes S3', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html')]),
]
W,H=landscape(A3)

def para(c, text, x, top, width, size=13, color='#334155', bold=False):
    style=ParagraphStyle('text',fontName='ArialBold' if bold else 'Arial',fontSize=size,leading=size*1.35,textColor=HexColor(color))
    p=Paragraph(escape(text),style)
    _,height=p.wrap(width,1000)
    p.drawOn(c,x,top-height)
    return height

def draw(c, item, page):
    c.setTitle('DevMendes - Mapa mental SAA-C03 - '+item['title'])
    c.setAuthor('DevMendes')
    c.setFillColor(HexColor('#F8FAFC'));c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(HexColor(item['color']));c.rect(0,H-12,W,12,fill=1,stroke=0)
    para(c,'DevMendes | Revisão SAA-C03',42,H-37,900,12,'#475569',True)
    para(c,item['title'],42,H-61,1000,29,'#0F172A',True)
    para(c,'Peso do domínio: '+item['weight']+' do conteúdo pontuado | Mapa de revisão independente',42,H-105,1000,12)
    c.drawImage(str(ROOT/'public/brand/devmendes.png'),W-118,H-118,width=76,height=76,preserveAspectRatio=True,mask='auto')
    # Cada ramo ocupa um cartão, ligado ao conceito central por uma curva.
    center=(W/2-112,325,224,156)
    card_w,card_h=355,143
    top_positions=[H-157,H-327,H-497]
    cards=[]
    for i in range(6):
        x=42 if i<3 else W-42-card_w
        y=top_positions[i%3]-card_h
        cards.append((x,y,card_w,card_h))
        cx,cy,cw,ch=center
        start_x=cx if i<3 else cx+cw
        end_x=x+card_w if i<3 else x
        mid=(start_x+end_x)/2
        c.setStrokeColor(HexColor(item['color']));c.setLineWidth(2)
        p=c.beginPath();p.moveTo(start_x,cy+ch/2);p.curveTo(mid,cy+ch/2,mid,y+card_h/2,end_x,y+card_h/2);c.drawPath(p)
    cx,cy,cw,ch=center
    c.setFillColor(HexColor('#0F172A'));c.roundRect(cx,cy,cw,ch,22,fill=1,stroke=0)
    para(c,'AWS SAA-C03',cx+19,cy+ch-20,cw-38,12,'#7DD3FC',True)
    para(c,item['center'][0],cx+19,cy+ch-49,cw-38,20,'#FFFFFF',True)
    para(c,item['center'][1],cx+19,cy+47,cw-38,12,'#CBD5E1')
    for (x,y,w,h),(title,lines) in zip(cards,item['branches']):
        c.setFillColor(white);c.setStrokeColor(HexColor('#CBD5E1'));c.setLineWidth(.8);c.roundRect(x,y,w,h,13,fill=1,stroke=1)
        c.setFillColor(HexColor(item['color']));c.roundRect(x,y+16,4,h-32,2,fill=1,stroke=0)
        height=para(c,title,x+18,y+h-16,w-36,16,item['color'],True)
        top=y+h-26-height
        for line in lines:
            used=para(c,'- '+line,x+18,top,w-36,12.5);top-=used+9
        assert top>y+8,(item['slug'],title,'texto excede o cartão')
    c.setFillColor(HexColor('#E2E8F0'));c.roundRect(42,109,W-84,49,10,fill=1,stroke=0)
    para(c,item['decision'],56,143,W-112,12,'#0F172A',True)
    para(c,'Fontes AWS (links clicáveis):',42,91,240,9,'#475569',True)
    x=207
    for label,url in item['sources']:
        c.setFont('Arial',9);c.setFillColor(HexColor('#0369A1'));c.drawString(x,82,label)
        width=pdfmetrics.stringWidth(label,'Arial',9);c.linkURL(url,(x,79,x+width,94),relative=0);x+=width+27
    para(c,'Referências consultadas em 19/11/2026. Os pesos indicam prioridade por domínio, não frequência garantida de assuntos.',42,61,W-84,9,'#64748B')
    para(c,'DevMendes - Material de estudo independente. AWS e seus serviços pertencem aos respectivos titulares.',42,43,W-84,8,'#64748B')
    c.setFont('Arial',9);c.drawRightString(W-42,33,str(page))
    c.showPage()

for item in MAPS:
    c=canvas.Canvas(str(OUT/f"saa-c03-{item['slug']}.pdf"),pagesize=(W,H))
    draw(c,item,1);c.save()
c=canvas.Canvas(str(OUT/'saa-c03-todos-os-mapas.pdf'),pagesize=(W,H))
for i,item in enumerate(MAPS,1):draw(c,item,i)
c.save()
print('Gerados quatro mapas individuais e a coletânea de quatro páginas.')
