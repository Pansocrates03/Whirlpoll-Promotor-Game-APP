-- New Report Procedure
CREATE PROCEDURE newReport
    @generadopor INT,
    @ubicacion INT,
    @motivo INT,
    @urgencia INT,
    @descripcion VARCHAR(255)
AS
BEGIN
    INSERT INTO reporte(generadopor,estatus,ubicacion,motivo,fechageneracion,descripcion)
    VALUES             (@generadopor,1,    @ubicacion,@motivo,GETDATE(),@descripcion)
END
GO

-- Example:
-- EXEC newReport @generadopor = 1, @ubicacion = 1, @motivo = 1, @urgencia = 1, @descripcion = 'lol';

CREATE PROCEDURE getReports

AS
BEGIN
    SELECT 
        reporte.id,
        empleado.nombre AS nombreEmpleado,
        ubicacion.nombre AS ubicacion,
        motivoreporte.descripcion AS motivo,
        fechageneracion,
        reporte.descripcion,
        imagen.link,
        reporte.urgencia
    FROM reporte
        INNER JOIN empleado ON empleado.id = reporte.generadopor
        INNER JOIN ubicacion ON ubicacion.id = reporte.ubicacion
        INNER JOIN motivoreporte ON motivoreporte.id = reporte.motivo
        LEFT JOIN imagen ON imagen.idreporte = reporte.id
END
GO

--EXEC getReports;
